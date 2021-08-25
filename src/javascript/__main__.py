import os, sys, argparse, shutil

parser = argparse.ArgumentParser(
    description="javascript (JSPyBridge) package manager. Use this to clear or update the internal package store."
)
parser.add_argument("--clean", default=False, action="store_true")
parser.add_argument("--update", default=False, action="store_true")
parser.add_argument("--install", default=False, action="store")
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
    os.system(f"npm install {args.install}")
else:
    parser.print_help(sys.stderr)
