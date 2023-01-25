## 1.0.1
* Fixing stdin String reading function that fails for long strings (#69) (thanks @mmerce)
* fix: type definitions so can build under strict (#56) (thanks @marcusds)

## 1.0.0
* pythonia: use utf-8 encoding for bridging (#54)

## 0.2.16
* py: Fixed console.log not working in Windows (#50) - @Peticali

## 0.2.15
* py: Fix variable assignment in events #45
* js/pythonia: Remove some type definitions (#43)

## 0.2.14
* Return None when JS returns null, disable colors in repr(), add uninstall to python package cli (#38)
* py: Use piped stdout if sys.stdout is modified, IDLE fixes (#41) 

## 0.2.13
* Add support for node 14 (#33)

## 0.2.12
* Iterate over non-arrays in JavaScript from Python [#29](https://github.com/extremeheat/JSPyBridge/pull/29)

## 0.2.11
* py: add an `--install <npm package>` option to the CLI to install internal packages outside of scripts

## 0.2.10
* Expose JSPyBridge on both sides of bridge. On python via `os.JSPyBridge` and via `globalThis.JSPyBridge` in Node.js.
* Customizable Node.js/Python binary path through `NODE_BIN` and `PYTHON_BIN` enviornment flags
* js: (Windows) Fix Electron stdout crashing issue
* py: RegExp is now exposed top-level for easier usability

## 0.2.9
* py: Improve error handling on Python process exit.

## 0.2.7
* py: Add new JavaScript expression evaluator

## 0.2.6
* py: Add new top-level `once` export, alias to Node.js's events function.

## 0.2.5
* py: Support Node versions 14+

## 0.2.3
* py: Add notebook and Google Colab support [#15](https://github.com/extremeheat/JSPyBridge/pull/15)
* py: CLI now has a new --update flag to update internal, Node.js dependencies. Now use --clean to reset the package store.

## 0.2.3
* Add support for `in` operator in Python code
* IO/error handling updates [#14](https://github.com/extremeheat/JSPyBridge/pull/14)

## 0.2.2
* py: Add new CLI to clear the internal node_module cache, can now be cleared with `python -m javascript clear`

## 0.2.1
* Initial release of bridge to access JavaScript from Python
* py: Fix issue with dependency installer
* py: Fix issue with error handler and issues with IPython

## 0.2.0
* Importing relative Python files now automatically adds the file's directory to the import path [#10](https://github.com/extremeheat/JSPyBridge/pull/10) 
* Automatically restart Python processes on a new Python import, if python was exit()'ed earlier
* Fix relative imports on Windows not splitting \ correctly
* Fix readme typo (@Heath123) [#9](https://github.com/extremeheat/JSPyBridge/pull/9)
* Documentation fixes

## 0.1.0

* Initial release of bridge to access Python from JavaScript
