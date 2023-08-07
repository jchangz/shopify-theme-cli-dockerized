<div align="center">
<h1 align="center">Shopify Theme CLI Dockerized</h1>
Containerized development environment for Shopify themes
</div>

## Requirements

[Docker Desktop](https://www.docker.com/products/docker-desktop/)

[Visual Studio Code](https://code.visualstudio.com/)

[Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Installation

### Quick start

```console
npx shopify-theme-cli-dockerized my-app
```

### Manually

Copy `.devcontainer` folder into your project directory.

## Usage

1. **Run Docker Desktop**

2. **Open project directory in VS Code.**

   Run

   > <kbd>F1</kbd> + <kbd>Dev Containers: Reopen in Container</kbd>
   >
   > or
   >
   > <kbd>F1</kbd> + <kbd>Dev Containers: Open Folder in Container</kbd>

3. **Open integrated terminal**

   <kbd>Terminal</kbd> > <kbd>New Terminal</kbd>

4. **Verify the installation**

   `shopify version`

   [Shopify CLI Theme Command Reference](https://shopify.dev/docs/themes/tools/cli/commands)

## Get Theme Files

- Initialize with Shopify's [Dawn Theme](https://github.com/Shopify/dawn)

  ```console
  shopify theme init
  ```

- Clone a Git repository

  ```console
  shopify theme init --clone-url $REPO_URL
  ```

- Pull theme files from your store

  ```console
  shopify theme pull --store $YOUR_STORE
  ```

## Start Developing

```console
shopify theme dev
```

More Details: [Developing inside a Container](https://code.visualstudio.com/docs/devcontainers/containers#_quick-start-open-an-existing-folder-in-a-container)
