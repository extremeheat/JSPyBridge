import re


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
        if "JSPyBridge" in at or "IPython" in at:
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
            lin, Code = lin.split("\n")
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


def processJsStacktrace(stack):
    lines = []
    message_line = ""
    error_line = ""
    found_main_line = False
    stacks = stack if (type(stack) is list) else stack.split("\n")
    for line in stacks:
        if not message_line:
            message_line = line
        if (not "JSPyBride" in line) and (not found_main_line):
            abs_path = re.search(r"\((.*):(\d+):(\d+)\)", line)
            file_path = re.search(r"(file:\/\/.*):(\d+):(\d+)", line)
            if abs_path or file_path:
                path = abs_path or file_path
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

    return (error_line, message_line, lines) if error_line else None


def getErrorMessage(failed_call, jsStackTrace, pyStacktrace):
    try:
        jse, jsm, jss = processJsStacktrace(jsStackTrace)
        pye, pys = processPyStacktrace(pyStacktrace)

        lines = print_error(failed_call, jse, jss, jsm, pye, pys)
        return "\n".join(lines)
    except Exception as e:
        print("Error in exception handler")
        import traceback

        print(traceback.format_tb(e))
        print(f"** JavaScript Stacktrace **{jsStackTrace}\n** Python Stacktrace **{pyStacktrace}")
        return ""
