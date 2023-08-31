import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import ora from "ora"
import { describe, expect, it } from "@jest/globals"
import { render } from "@inquirer/testing"
import { select, input } from "@inquirer/prompts"
import { folderNameQuestion, installQuestions } from "../bin/questions"
import { createFolderPath, copyFolderSync } from "../bin/install"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const __parentdir = path.join(__dirname, "..")
const __devcontainer = path.join(__parentdir, ".devcontainer")

const testName = "test-app"
const appName = "my-app"
const installDirectory = path.join(__parentdir, testName)
const __devcontainerinstalldir = path.join(installDirectory, ".devcontainer")

describe("Installation", () => {
  beforeAll(() => {
    describe("Create test directory", () => {
      fs.mkdirSync(installDirectory)
    })
  })

  afterAll(() => {
    fs.rmSync(installDirectory, { recursive: true })
  })

  describe(`Create test directory /${testName}`, () => {
    it(`Expect true if it exists`, () => {
      const dirExists = fs.existsSync(installDirectory)
      expect(dirExists).toBe(true)
    })
  })

  describe("Install in current directory", () => {
    it("Select 'Current directory' option", async () => {
      const { answer, events, getScreen } = await render(
        select,
        installQuestions
      )
      events.keypress("enter")
      await expect(answer).resolves.toEqual("current")
      expect(getScreen()).toMatchInlineSnapshot(
        `"? Choose your installation directory Current directory"`
      )
    })
    it("Expect true when files are successfully copied", async () => {
      const spinner = ora().start("Copying .devcontainer files")
      const install = await copyFolderSync(
        __devcontainer,
        __devcontainerinstalldir,
        spinner
      )
      expect(install).toBe(true)
    })
    describe("Verify Installation", () => {
      describe(`${testName}/.devcontainer`, () => {
        const __devcontainer = path.join(installDirectory, ".devcontainer")
        it("Directory should exist", () => {
          const dirExists = fs.existsSync(__devcontainer)
          expect(dirExists).toBe(true)
        })
        it("Dockerfile should exist", () => {
          const __dir = path.join(__devcontainer, "Dockerfile")
          const dirExists = fs.existsSync(__dir)
          expect(dirExists).toBe(true)
        })
        it(".devcontainer.json should exist", () => {
          const __dir = path.join(__devcontainer, "devcontainer.json")
          const dirExists = fs.existsSync(__dir)
          expect(dirExists).toBe(true)
        })
      })
    })
  })

  describe("Install in nested directory", () => {
    it("Select 'New folder' option", async () => {
      const { answer, events, getScreen } = await render(
        select,
        installQuestions
      )
      events.keypress("down")
      events.keypress("enter")
      await expect(answer).resolves.toEqual("new")
      expect(getScreen()).toMatchInlineSnapshot(
        `"? Choose your installation directory New folder"`
      )
    })
    it("Select default 'my-app' as folder name", async () => {
      const { answer, events, getScreen } = await render(
        input,
        folderNameQuestion
      )
      events.keypress("enter")
      await expect(answer).resolves.toEqual("my-app")
      expect(getScreen()).toMatchInlineSnapshot(
        `"? Enter your folder name my-app"`
      )
    })
    describe(`Create my-app directory`, () => {
      it(`Expect true if it exists`, () => {
        const my_app_directory = path.join(__parentdir, testName, appName)
        fs.mkdirSync(my_app_directory)
        const dirExists = fs.existsSync(my_app_directory)
        expect(dirExists).toBe(true)
      })
    })
    it("Expect true when files are successfully copied", async () => {
      const spinner = ora().start("Copying .devcontainer files")
      const __newdevcontainerinstalldir = path.join(
        __parentdir,
        testName,
        appName,
        ".devcontainer"
      )
      const install = await copyFolderSync(
        __devcontainer,
        __newdevcontainerinstalldir,
        spinner
      )
      expect(install).toBe(true)
    })
    describe("Verify Installation", () => {
      describe(`${testName}/${appName}/.devcontainer`, () => {
        const __devcontainer = path.join(
          installDirectory,
          appName,
          ".devcontainer"
        )
        it("Directory should exist", () => {
          const dirExists = fs.existsSync(__devcontainer)
          expect(dirExists).toBe(true)
        })
        it("Dockerfile should exist", () => {
          const __dir = path.join(__devcontainer, "Dockerfile")
          const dirExists = fs.existsSync(__dir)
          expect(dirExists).toBe(true)
        })
        it(".devcontainer.json should exist", () => {
          const __dir = path.join(__devcontainer, "devcontainer.json")
          const dirExists = fs.existsSync(__dir)
          expect(dirExists).toBe(true)
        })
      })
    })
  })
})
