#!/usr/bin/env node

import path from "path"
import { fileURLToPath } from "url"
import ora from "ora"
import { select, input } from "@inquirer/prompts"
import { installQuestions, folderNameQuestion } from "./questions.js"
import { createFolderPath, copyFolderSync } from "./install.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const __parentdir = path.join(__dirname, "..")
const __devcontainer = path.join(__parentdir, ".devcontainer")

const __installdir = process.cwd()
let __devcontainerinstalldir = path.join(__installdir, ".devcontainer")
let __folderpathname

const installType = await select(installQuestions)

if (installType === "new") {
  while (!__folderpathname) {
    const answer = await input(folderNameQuestion)
    const folderPath = await createFolderPath(answer)
    if (folderPath) {
      __folderpathname = folderPath
      __devcontainerinstalldir = path.join(
        __installdir,
        folderPath,
        ".devcontainer"
      )
    }
  }
}

const spinner = ora().start("Copying .devcontainer files")

await copyFolderSync(__devcontainer, __devcontainerinstalldir, spinner)

console.group()
console.log("\nInstallation complete, ensure Docker Desktop is running. Run:\n")
console.group()
if (__folderpathname) console.log(`cd ${__folderpathname}`)
console.log(`code .\n`)
console.groupEnd()
console.groupEnd()
