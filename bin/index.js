#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { setTimeout } from "timers/promises"
import ora from "ora"
import { select, input } from "@inquirer/prompts"
import { installQuestions, folderNameQuestion } from "./questions.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const __parentdir = path.join(__dirname, "..")
const __devcontainer = path.join(__parentdir, ".devcontainer")

const __installdir = process.cwd()
let __devcontainerinstalldir = path.join(__installdir, ".devcontainer")
let __folderpathname

const installType = await select(installQuestions)

if (installType === "new") {
  while (!__folderpathname) {
    await input(folderNameQuestion).then((folderPath) => {
      try {
        fs.mkdirSync(folderPath)
        __folderpathname = folderPath
      } catch (err) {
        if (err.code === "EEXIST") {
          console.log(
            `The folder "${folderPath}" already exists in the current directory, please try another name\n`
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
  const delay = 250

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
        'The directory ".devcontainer" already exists, please remove it before installing\n'
      )
    } else {
      spinner.fail(err)
    }
    process.exit(1)
  }
}

await copyFolderSync(__devcontainer, __devcontainerinstalldir, spinner)

console.group()
console.log("\nInstallation complete, ensure Docker Desktop is running. Run:\n")
console.group()
if (__folderpathname) console.log(`cd ${__folderpathname}`)
console.log(`code .\n`)
console.groupEnd()
console.groupEnd()
