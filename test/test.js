import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"
import { expect } from "chai"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const __parentdir = path.join(__dirname, "..")

const testName = "test-app"
const appName = "my-app"
const installDirectory = path.join(__parentdir, testName)

describe("Installation", () => {
  before(async () => {
    describe("Create test directory", () => {
      fs.mkdirSync(installDirectory)
    })
  })

  describe(`Create test directory /${testName}`, () => {
    it(`Expect true if it exists`, () => {
      const dirExists = fs.existsSync(installDirectory)
      expect(dirExists).to.be.true
    })
  })

  describe("Install in current directory", () => {
    describe("npx shopify-theme-cli-dockerized", () => {
      it("Expect !null when files are successfully copied", () => {
        execSync(
          `../bin/index.js`,
          { cwd: installDirectory, stdio: [] },
          (error) => expect(error).to.be.not.null
        )
      })
    })
    describe("Verify Installation", () => {
      describe(`${testName}/.devcontainer`, () => {
        const __devcontainer = path.join(installDirectory, ".devcontainer")
        it("Directory should exist", () => {
          const dirExists = fs.existsSync(__devcontainer)
          expect(dirExists).to.be.true
        })
        it("Dockerfile should exist", () => {
          const __dir = path.join(__devcontainer, "Dockerfile")
          const dirExists = fs.existsSync(__dir)
          expect(dirExists).to.be.true
        })
        it(".devcontainer.json should exist", () => {
          const __dir = path.join(__devcontainer, "devcontainer.json")
          const dirExists = fs.existsSync(__dir)
          expect(dirExists).to.be.true
        })
      })
    })
  })

  describe("Install in nested directory", () => {
    describe(`npx shopify-theme-cli-dockerized ${appName}`, () => {
      it("Expect !null when files are successfully copied", async () => {
        execSync(
          `../bin/index.js ${appName}`,
          { cwd: installDirectory, stdio: [] },
          (error) => expect(error).to.be.not.null
        )
      })
    })

    describe(`Directory "${testName}/${appName}" should exist`, () => {
      it(`${installDirectory}/${appName}`, () => {
        const __dir = path.join(installDirectory, appName)
        const dirExists = fs.existsSync(__dir)
        expect(dirExists).to.be.true
      })
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
          expect(dirExists).to.be.true
        })
        it("Dockerfile should exist", () => {
          const __dir = path.join(__devcontainer, "Dockerfile")
          const dirExists = fs.existsSync(__dir)
          expect(dirExists).to.be.true
        })
        it(".devcontainer.json should exist", () => {
          const __dir = path.join(__devcontainer, "devcontainer.json")
          const dirExists = fs.existsSync(__dir)
          expect(dirExists).to.be.true
        })
      })
    })
  })

  after(async () => {
    fs.rmSync(installDirectory, { recursive: true })
  })
})
