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