const cp = require('child_process')
const fs = require('fs')
const { join } = require('path')
const { pathToFileURL } = require('url')

const NODE_PM = process.env.NODE_PM || 'npm'
const PACKAGE_PATH = join(__dirname, 'package.json')
const LOCK_PATH = join(__dirname, NODE_PM === 'npm' ? 'package-lock.json' : 'yarn.lock')
const MOD_PATH = join(__dirname, 'node_modules')
const log = (...what) => console.log('\x1b[1m', ...what, '\x1b[0m')

class PackageManager {
  constructor () {
    this.loadedPackages = []
  }

  /**
   * Some utility methods to save, create, update the package.json
   */
  reload () {
    try {
      this.installed = JSON.parse(fs.readFileSync(PACKAGE_PATH))
    } catch (e) {
      fs.writeFileSync(PACKAGE_PATH, '{\n\t"name": "js-modules",\n\t"description": "This folder holds the installed JS deps",\n\t"dependencies": {}\n}')
      this.installed = JSON.parse(fs.readFileSync(PACKAGE_PATH))
    }
  }

  save () {
    fs.writeFileSync(PACKAGE_PATH, JSON.stringify(this.installed, null, 2))
  }

  reset () {
    fs.rmSync(PACKAGE_PATH, { force: true })
    fs.rmSync(LOCK_PATH, { force: true })
    // This is unsafe:
    // fs.rmSync(MOD_PATH, { force: true, recursive: true })
  }

  getInstalledVersion (name) {
    return this.installed.dependencies[name]
  }

  setInstalledVersion (name, version) {
    this.reload()
    this.installed.dependencies[name] = version
    this.save()
  }

  /**
   * Installs a JavaScript package into the internal NPM module directory.
   * If a version is specified, then it uses that to form a new internal name
   * for this package to allow for having multiple versions of the same package installed.
   *
   * @returns {string} New internal package name.
   */
  install (name, version) {
    version = version || 'latest'
    this.reload()
    let internalName = name
    if (version !== 'latest') internalName = name + '--' + Buffer.from(version).toString('hex')

    const installedVersion = this.getInstalledVersion(internalName)
    let needsInstall = false
    if (version === 'latest' && installedVersion !== 'latest') {
      needsInstall = true
    } else if (version !== 'latest' && !installedVersion) {
      needsInstall = true
    }

    if (needsInstall) {
      log(`Installing '${name}' version '${version}'... This will only happen once.`)
      if (version === 'latest') {
        // If version is latest, we need to handle this a bit differently. `npm i package@latest` does NOT
        // work, since it will not actually save that into the Package Lock/JSON file. So we must first
        // put `latest` into the package.json, then run npm install to persist the `latest` version.
        this.setInstalledVersion(name, 'latest')
        cp.execSync(`${NODE_PM} install`, { stdio: 'inherit', cwd: __dirname })
      } else {
        cp.execSync(`${NODE_PM} install ${internalName}@npm:${name}@${version}`, { stdio: 'inherit', cwd: __dirname })
      }

      process.stderr.write('\n\n')
      process.stdout.write('\n')
      log('OK.')
      // return this.resolve(internalName)
      return internalName
    } else {
      // The package is already installed.
      return internalName
    }
  }

  resolve (packageName) {
    const modPath = join(MOD_PATH, packageName)
    const packageInfo = require(join(modPath, 'package.json'))
    if (packageInfo.main) {
      let pname = join(modPath, packageInfo.main)
      // The ES6 `import()` function requires a file extension, always
      if (!packageInfo.main.endsWith('.js')) {
        try {
          const finfo = fs.lstatSync(pname)
          if (finfo.isDirectory()) pname = join(pname, '/index.js')
        } catch {
          pname += '.js'
        }
      }
      return pathToFileURL(pname)
    }
    return new pathToFileURL(join(modPath, 'index.js'))
  }
}

const pm = new PackageManager()

async function $require (name, version, relativeTo) {
  if (relativeTo) {
    const mod = await import('file://' + join(relativeTo, name))
    return mod.default ?? mod
  }

  if (!version) {
    // The user didn't specify a version. So try whatever version we find installed. This can fail for non CJS modules.
    try { return require(name) } catch { }
  }

  // A version was specified, or the package wasn't found already installed.
  const newpath = pm.install(name, version)
  const mod = await import(newpath)
  return mod.default ?? mod
}

module.exports = { $require }

// async function test () {
//   console.log(await $require('prismarine-block'))
//   console.log(await $require('nbt'))
//   console.log(await $require('chalk', '2'))
//   console.log(await $require('chalk', '3'))
// }
// test()
