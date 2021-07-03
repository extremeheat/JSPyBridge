const cp = require('child_process')
const fs = require('fs')
const { join } = require('path')
let packages
try {
  packages = require('./package.json')
} catch (e) {
  const p = join(__dirname, './package.json')
  fs.writeFileSync(p, `{\n\t"name": "js-modules",\n\t"description": "This folder holds the installed JS deps",\n\t"dependencies": {}\n}`)
  packages = JSON.parse(fs.readFileSync(p, 'utf-8'))
}

const NODE_PM = process.env.NODE_PM || 'npm'

function loadPackages() {
  packages = require('./package.json')
}

function savePackages() {
  fs.writeFileSync('./package.json', JSON.stringify(packages, null, 2))
}

const log = (...what) => console.log('\033[1m', ...what, '\033[0m')

function processPackage(name, desiredVersion) {
  // Sometimes we have to rename the package for multi-versioning to work.
  // Some projects may use one version of a dep over the other.
  let finalName = desiredVersion ? name + '--' + Buffer.from(desiredVersion).toString('hex') : name
  const depVer = packages.dependencies[finalName]
  if (depVer) {
    if (!desiredVersion && depVer !== 'latest') {
      packages.dependencies[name] = 'latest'
      savePackages()    
    }
    // log('Already installed!', depVer)
    return finalName
  } else if (!desiredVersion) {
    // savePackages()
    log(`Installing '${name}' version 'latest'... This will only happen once.`)
    cp.execSync(`${NODE_PM} install ${finalName}`, { stdio: 'inherit', cwd: __dirname })
    loadPackages()
    packages.dependencies[name] = 'latest'
    savePackages()
    log('OK.')
  } else if (desiredVersion) {
    log(`Installing '${name}' version '${desiredVersion}'... This will only happen once.`)
    cp.execSync(`${NODE_PM} install ${finalName}@npm:${name}@${desiredVersion}`, { stdio: 'inherit', cwd: __dirname })
    log('OK.')
    // savePackages()
  }

  loadPackages()
  return finalName
}

function reinstall() {
  console.info('Erasing node_modules...')
  fs.rmdirSync('./node_modules')
  console.info('OK')
  console.info('Installing...')
  cp.execSync(`npm install`, { stdio: 'inherit', cwd: __dirname })
  console.info('OK')
}

async function $require(what, version, relativeTo) {
  if (relativeTo) {
    return await import('file://' + join(relativeTo, what))
  }
  let modPath
  if (!version) {
    try { modPath = require.resolve(what) } catch {}
    if (modPath) {
      // It's already installed, just use that.
      const mod = await import(what)
      return mod.default ?? mod
    }
  }
  const newpath = processPackage(what, version)
  const mod = await import(newpath)
  return mod.default ?? mod
}

module.exports = { processPackage, reinstall, $require }

// try {
//   console.log(processPackage('prismarine-block'))
//   console.log(processPackage('prismarine-item', '^3'))
// } catch (e) {
//   process.exit(1)
// }
// from javascript import _require as require
// mineflayer = require('mineflayer')
// npm init && npm i mineflayer mineflayer-pathfinder
// from javascript import _require as require
// mineflayer = require('mineflayer')