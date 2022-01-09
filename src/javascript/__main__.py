import os, sys, argparse, shutil

PACKAGEJSON = '{\n\t"name": "js-modules",\n\t"description": "This folder holds the installed JS deps",\n\t"dependencies": {}\n}'

parser = argparse.ArgumentParser(
    description="javascript (JSPyBridge) package manager. Use this to clear or update the internal package store."
)
parser.add_argument("--clean", default=False, action="store_true")
parser.add_argument("--update", default=False, action="store_true")
parser.add_argument("--install", default=False, action="store")
parser.add_argument("--uninstall", default=False, action="store")
args = parser.parse_args()

if args.clean:
    d = os.path.dirname(__file__)
    nm = d + "/js/node_modules/"
    nl = d + "/js/package-lock.json"
    np = d + "/js/package.json"
    print("Deleting", nm, nl, np)
    try:
        shutil.rmtree(nm)
    except Exception:
        pass
    try:
        os.remove(nl)
    except Exception:
        pass
    try:
        os.remove(np)
    except Exception:
        pass
elif args.update:
    print("Updating package store")
    os.chdir(os.path.dirname(__file__) + "/js")
    os.system("npm update")
elif args.install:
    os.chdir(os.path.dirname(__file__) + "/js")
    if not os.path.exists("package.json"):
        with open("package.json", "w") as f:
            f.write(PACKAGEJSON)
    os.system(f"npm install {args.install}")
elif args.uninstall:
    os.chdir(os.path.dirname(__file__) + "/js")
    if os.path.exists("package.json"):
        os.system(f"npm uninstall {args.uninstall}")
    else:
        printf("No packages are currently installed")
else:
    parser.print_help(sys.stderr)
