import json
import os.path
import subprocess
dn = os.path.dirname(__file__)

try:
    with open(dn + './js-packages/package.json', 'r') as f:
        j = json.loads(f)
except Exception:
    with open(dn + './js-packages/package.json', 'w') as f:
        f.write('{"dependencies": {}}')
        j = {"dependencies": {}}

installed = j['dependencies']

def have(packageName):
    return packageName in installed

def install(packageName):
    if not have(packageName):
        print('Installing', packageName, '@ latest')
        