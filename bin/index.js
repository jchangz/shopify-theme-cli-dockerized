#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { setTimeout } from "timers/promises"
import ora from "ora"
import inquirer from "inquirer"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const __parentdir = path.join(__dirname, "..")
const __devcontainer = path.join(__parentdir, ".devcontainer")

const __installdir = process.cwd()
let __devcontainerinstalldir = path.join(__installdir, ".devcontainer")
let __folderpathname

const q1 = await inquirer
  .prompt([
    {
      name: "installType",
      message: "Choose your installation directory",
      type: "list",
      choices: ["Current directory", "New named folder"],
    },
  ])
  .then((answer) => {
    const { installType } = answer
    if (installType === "New named folder") return true
    return false
  })

if (q1) {
  while (!__folderpathname) {
    await inquirer
      .prompt([
        {
          name: "folderPath",
          type: "input",
          message: "Your directory name?",
          default: "my-app",
        },
      ])
      .then((answer) => {
        const { folderPath } = answer
        try {
          fs.mkdirSync(folderPath)
          __folderpathname = folderPath
        } catch (err) {
          if (err.code === "EEXIST") {
            console.log(
              `The folder "${folderPath}" already exists in the current directory, please give it another name`
            )
          } else {
            console.log(err)
          }
        }
        __devcontainerinstalldir = path.join(
          __installdir,
          folderPath,
          ".devcontainer"
        )
      })
  }
}

const spinner = ora().start("Copying .devcontainer files")

async function copyFolderSync(from, to, spinner) {
  const delay = 500

  try {
    fs.mkdirSync(to)
    fs.readdirSync(from).forEach((element) => {
      fs.copyFileSync(path.join(from, element), path.join(to, element))
    })
    await setTimeout(delay)
    spinner.succeed(
      `.devcontainer files have been created in ${path.join(to, "..")}`
    )
  } catch (err) {
    if (err.code === "EEXIST") {
      await setTimeout(delay)
      spinner.fail(
        'The directory ".devcontainer" already exists, please remove it'
      )
    } else {
      spinner.fail(err)
    }
    process.exit(1)
  }
}

await copyFolderSync(__devcontainer, __devcontainerinstalldir, spinner)

console.log("\nInstallation complete, ensure Docker Desktop is running. Run:\n")
if (__folderpathname) console.log(`  cd ${__folderpathname}`)
console.log(`  code .\n`)
