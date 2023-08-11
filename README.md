# Shopify Theme CLI Dockerized

Containerized development environment for Shopify themes

## Get Started

### Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Installation

Named Folder:

```console
npx shopify-theme-cli-dockerized my-app
```

Current Directory:

```console
npx shopify-theme-cli-dockerized
```

### Verify

1. **Run Docker Desktop**

2. **Open project directory in VS Code.**

   ```console
   Dev Containers: Reopen in Container
   ```

3. **Open integrated terminal**

4. **Verify Shopify CLI is installed**

   ```console
   shopify version
   ```

## Usage

### Get Theme Files

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

### Start Developing

```console
shopify theme dev
```

## Documentation

- [Developing inside a Container](https://code.visualstudio.com/docs/devcontainers/containers#_quick-start-open-an-existing-folder-in-a-container)

- [Shopify CLI Theme Command Reference](https://shopify.dev/docs/themes/tools/cli/commands)
