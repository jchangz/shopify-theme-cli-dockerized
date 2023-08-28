import fs from "fs"
import path from "path"
import { setTimeout } from "timers/promises"

export async function createFolderPath(folderPath) {
  try {
    fs.mkdirSync(folderPath)
    return folderPath
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(
        `The folder "${folderPath}" already exists in the current directory, please try another name\n`
      )
    } else {
      console.log(err)
    }
  }
}

export async function copyFolderSync(from, to, spinner) {
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
