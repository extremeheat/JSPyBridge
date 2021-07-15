import os, sys, argparse, shutil

parser = argparse.ArgumentParser(description='javascript (JSPyBridge) package manager. Use this to clear the internal package store.')
parser.add_argument("clean", nargs='?', default=False)
args = parser.parse_args()


if args.clean:
    d = os.path.dirname(__file__)
    nm = d + '/js/node_modules/'
    nl = d + '/js/package-lock.json'
    np = d + '/js/package.json'
    print ('Deleting', nm, nl, np)
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

else:
    parser.print_help(sys.stderr)