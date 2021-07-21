import re, sys, traceback


class JavaScriptError(Exception):
    def __init__(self, call, jsStackTrace, pyStacktrace=None):
        self.call = call
        self.js = jsStackTrace
        self.py = pyStacktrace


class Chalk:
    def red(self, text):
        return "\033[91m" + text + "\033[0m"

    def blue(self, text):
        return "\033[94m" + text + "\033[0m"

    def green(self, text):
        return "\033[92m" + text + "\033[0m"

    def yellow(self, text):
        return "\033[93m" + text + "\033[0m"

    def bold(self, text):
        return "\033[1m" + text + "\033[0m"

    def italic(self, text):
        return "\033[3m" + text + "\033[0m"

    def underline(self, text):
        return "\033[4m" + text + "\033[0m"

    def gray(self, text):
        return "\033[2m" + text + "\033[0m"

    def bgred(self, text):
        return "\033[41m" + text + "\033[0m"

    def darkred(self, text):
        return "\033[31m" + text + "\033[0m"

    def lightgray(self, text):
        return "\033[37m" + text + "\033[0m"

    def white(self, text):
        return "\033[97m" + text + "\033[0m"


chalk = Chalk()


def format_line(line):
    if line.startswith("<") or line.startswith("\\"):
        return line
    statements = [
        "const ",
        "await ",
        "import ",
        "let ",
        "var ",
        "async ",
        "self ",
        "def ",
        "return ",
        "from ",
        "for ",
        "raise ",
        "try ",
        "except ",
        "catch ",
        ":",
        "\\(",
        "\\)",
        "\\+",
        "\\-",
        "\\*",
        "=",
    ]
    secondary = ["{", "}", "'", " true", " false"]
    for statement in statements:
        exp = re.compile(statement, re.DOTALL)
        line = re.sub(exp, chalk.red(statement.replace("\\", "")) + "", line)
    for second in secondary:
        exp = re.compile(second, re.DOTALL)
        line = re.sub(exp, chalk.blue(second) + "", line)
    return line


def print_error(failedCall, jsErrorline, jsStackTrace, jsErrorMessage, pyErrorline, pyStacktrace):
    lines = []
    log = lambda *s: lines.append(" ".join(s))
    log(
        "☕",
        chalk.bold(chalk.bgred(" JavaScript Error ")),
        f"Call to '{failedCall.replace('~~', '')}' failed:",
    )

    for at, line in pyStacktrace:
        if "javascript" in at or "IPython" in at:
            continue
        if not line:
            log(" ", chalk.gray(at))
        else:
            log(chalk.gray(">"), format_line(line))
            log(" ", chalk.gray(at))

    log(chalk.gray(">"), format_line(pyErrorline))

    log("\n... across the bridge ...\n")

    for traceline in reversed(jsStackTrace):
        log(" ", chalk.gray(traceline))

    log(chalk.gray(">"), format_line(jsErrorline))
    log("🌉", chalk.bold(jsErrorMessage))

    return lines


def processPyStacktrace(stack):
    lines = []
    error_line = ""
    stacks = stack

    for lin in stacks:
        lin = lin.rstrip()
        if lin.startswith("  File"):
            tokens = lin.split("\n")
            lin = tokens[0]
            Code = tokens[1] if len(tokens) > 1 else chalk.italic("<via standard input>")
            fname = lin.split('"')[1]
            line = re.search(r"\, line (\d+)", lin).group(1)
            at = re.search(r"\, in (.*)", lin)
            if at:
                at = at.group(1)
            else:
                at = "^"
            lines.append([f"at {at} ({fname}:{line})", Code.strip()])
        elif lin.strip():
            error_line = lin.strip()

    return error_line, lines


INTERNAL_FILES = ["bridge.js", "pyi.js", "errors.js", "deps.js", "test.js"]


def isInternal(file):
    for f in INTERNAL_FILES:
        if f in file:
            return True
    return False


def processJsStacktrace(stack, allowInternal=False):
    lines = []
    message_line = ""
    error_line = ""
    found_main_line = False
    # print("Allow internal", allowInternal)
    stacks = stack if (type(stack) is list) else stack.split("\n")
    for line in stacks:
        if not message_line:
            message_line = line
        if allowInternal:
            lines.append(line.strip())
        elif (not isInternal(line)) and (not found_main_line):
            abs_path = re.search(r"\((.*):(\d+):(\d+)\)", line)
            file_path = re.search(r"(file:\/\/.*):(\d+):(\d+)", line)
            base_path = re.search(r"at (.*):(\d+):(\d+)$", line)
            if abs_path or file_path or base_path:
                path = abs_path or file_path or base_path
                fpath, errorline, char = path.groups()
                if fpath.startswith("node:"):
                    continue
                with open(fpath, "r") as f:
                    flines = f.readlines()
                    error_line = flines[int(errorline) - 1].strip()
                lines.append(line.strip())
                found_main_line = True
        elif found_main_line:
            lines.append(line.strip())

    if allowInternal and not error_line:
        error_line = "^"
    return (error_line, message_line, lines) if error_line else None


def getErrorMessage(failed_call, jsStackTrace, pyStacktrace):
    try:
        jse, jsm, jss = processJsStacktrace(jsStackTrace) or processJsStacktrace(jsStackTrace, True)
        pye, pys = processPyStacktrace(pyStacktrace)

        lines = print_error(failed_call, jse, jss, jsm, pye, pys)
        return "\n".join(lines)
    except Exception as e:
        print("Error in exception handler")
        import traceback

        print(e)
        pys = "\n".join(pyStacktrace)
        print(f"** JavaScript Stacktrace **\n{jsStackTrace}\n** Python Stacktrace **\n{pys}")
        return ""


# Custom exception logic

# Fix for IPython as it blocks the exception hook
# https://stackoverflow.com/a/28758396/11173996
try:
    __IPYTHON__
    import IPython.core.interactiveshell

    oldLogger = IPython.core.interactiveshell.InteractiveShell.showtraceback

    def newLogger(*a, **kw):
        ex_type, ex_inst, tb = sys.exc_info()
        if ex_type is JavaScriptError:
            pyStacktrace = traceback.format_tb(tb)
            # The Python part of the stack trace is already printed by IPython
            print(getErrorMessage(ex_inst.call, ex_inst.js, pyStacktrace))
        else:
            oldLogger(*a, **kw)

    IPython.core.interactiveshell.InteractiveShell.showtraceback = newLogger
except NameError:
    pass

orig_excepthook = sys.excepthook


def error_catcher(error_type, error, error_traceback):
    """
    Catches JavaScript exceptions and prints them to the console.
    """
    if error_type is JavaScriptError:
        pyStacktrace = traceback.format_tb(error_traceback)
        jsStacktrace = error.js
        message = getErrorMessage(error.call, jsStacktrace, pyStacktrace)
        print(message, file=sys.stderr)
    else:
        orig_excepthook(error_type, error, error_traceback)


sys.excepthook = error_catcher
# ====
