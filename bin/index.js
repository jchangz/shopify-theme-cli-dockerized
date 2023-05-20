#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { setTimeout } from "timers/promises"
import chalk from "chalk"
import ora from "ora"

const chalkError = (err) => `${chalk.white.bgRed.bold("ERROR")} ${err}`

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const __parentdir = path.join(__dirname, "..")
const __devcontainer = path.join(__parentdir, ".devcontainer")

const __installdir = process.cwd()
let __devcontainerinstalldir = path.join(__installdir, ".devcontainer")

if (process.argv.length > 2) {
  const folderPath = process.argv[2]

  try {
    fs.mkdirSync(folderPath)
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(
        chalkError(
          `The folder "${folderPath}" already exists in the current directory, please give it another name.`
        )
      )
    } else {
      console.log(chalkError(err))
    }
    process.exit(1)
  }

  __devcontainerinstalldir = path.join(
    __installdir,
    folderPath,
    ".devcontainer"
  )
}

const spinner = ora().start("Copying .devcontainer files")
const delay = 500

async function copyFolderSync(from, to) {
  try {
    fs.mkdirSync(to)
    fs.readdirSync(from).forEach((element) => {
      fs.copyFileSync(path.join(from, element), path.join(to, element))
    })
    await setTimeout(delay)
    spinner.succeed(".devcontainer files have been created")
  } catch (err) {
    if (err.code === "EEXIST") {
      await setTimeout(delay)
      spinner.fail(
        chalkError(
          'The directory ".devcontainer" already exists, please remove it'
        )
      )
    } else {
      spinner.fail(chalkError(err))
    }
    process.exit(1)
  }
}

await copyFolderSync(__devcontainer, __devcontainerinstalldir)
