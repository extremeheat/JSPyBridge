## 1.2.2
* [Handle non-Error objects thrown in JS (#154)](https://github.com/extremeheat/JSPyBridge/commit/5b3aecd787fb2bb531079b61f8492a92f633eaff) (thanks @extremeheat)
* [docs: fix typo (#146)](https://github.com/extremeheat/JSPyBridge/commit/bd17b0de48baa761284dfef469641ba46d5357bc) (thanks @simoneb)
* [pythonia: update typescript types (#142)](https://github.com/extremeheat/JSPyBridge/commit/d17217070ea0ff5baa0c96a06549006dce82df20) (thanks @Pickleboyonline)

## 1.2.1
* [Fix ES5 class handling, allow disabling timeouts (#137)](https://github.com/extremeheat/JSPyBridge/commit/a2d7369d861b6be9472ce2b72b3a92e78a06cda4) (thanks @extremeheat)

## 1.2.0
* [pythonia: fix: more graceful python shutdown (#134)](https://github.com/extremeheat/JSPyBridge/commit/78e4c4a8cdb127a65eb65e75038f5563eb7e7b3d) (thanks @thearchitector)
* [Update CI to node 18](https://github.com/extremeheat/JSPyBridge/commit/5828b00889761f57429aed4fb317d20497f9a703) (thanks @extremeheat)
* [javascript: Allow manual re-initialization of NodeJS process (#131)](https://github.com/extremeheat/JSPyBridge/commit/adab7cff4bfc88d94d5781db503270e9e285b215) (thanks @Tales-Carvalho)
* [javascript: replace deprecated thread setDaemon setter with property assignment (#124)](https://github.com/extremeheat/JSPyBridge/commit/060f21e13cc55c8efb3e79e1714f96b63eb45fcd) (thanks @Ableytner)

## 1.1.3
* [javascript: fix handler leak (#121)](https://github.com/extremeheat/JSPyBridge/commit/5a2bd1eabf86987ab5641dd4913d3fc2e0ba4ad0) (thanks @extremeheat)

## 1.1.2
* [javascript: don't try manually resolving path after package installation, try import() directly (#115)](https://github.com/extremeheat/JSPyBridge/commit/0e3a0913165142a62616dafaca4003cee2af304f) (thanks @extremeheat)

## 1.1.1
* [Fix `javascript` stdout not appearing in Python on notebooks (#112)](https://github.com/extremeheat/JSPyBridge/commit/d2ec236ec6b348804103816ca92de98699cb9036) (thanks @extremeheat)

## 1.1.0
* [Allow transferring binary data from JS to Python without serialization (CC #67) (#103)](https://github.com/extremeheat/JSPyBridge/commit/36a0c74d14ef891a72f1c39d9c83bb4e36ab35ba) (thanks @mara004)
* [Add None check for event_loop before adding to its queue (#105)](https://github.com/extremeheat/JSPyBridge/commit/2f2752285e2c627c7b6ae88eb66a18a6517e8eaf) (thanks @mrdanpsmith)

## 1.0.4
* [javascript: check NODE_BIN in os.environ dict instead of attr (#100)](https://github.com/extremeheat/JSPyBridge/commit/054332f69b51ee2b9dca6d8de188313f9070d208) (thanks @extremeheat)

## 1.0.3
* [Add option to configure call timeout (REQ_TIMEOUT) from env var for Python calls from JavaScript (#90)](https://github.com/extremeheat/JSPyBridge/commit/95ad451f22ab5f20b8b63372377ea560a18c04b0) (thanks @jc-roman)

## 1.0.2
* pythonia: Remove websocket comm [#83](https://github.com/extremeheat/JSPyBridge/pull/83), to fix issue with Electron-like environments

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
