# Screeps TS ESBuild

Screeps TS ESBuild is a starting point for a Screeps AI written in Typescript that uses [ESBuild](https://esbuild.github.io/) to **compile**, **minify** and **treeshake** your script and ESLint Airbnb to ensure code style and good pratices. It provides everything you need to start writing your AI whilst leaving main.ts as empty as possible.

## Installation

The project needs some packages/programs to be properly installed in your OS. for its correct functioning, which are:

#### Windows Prerequisites

1. Install the latest **LTS** version of NodeJS: [NodeJS Downloads](https://nodejs.org/en/download/), opt for Windows Installer (.msi) without installing Chocolatey when starting to install NodeJS

2. Install PNPM version 7 following the [official site instructions](https://pnpm.io/en/installation#usando-um-script) or using the commands below for those using Windows and PowerShell:
   ```shell
   iwr https://get.pnpm.io/install.ps1 -useb | iex
   ```

#### Linux Prerequisites

1. Install the latest LTS version of NodeJS with the commands below (For **Debian** and **variants**):

   ```bash
   sudo apt install curl
   curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash
   sudo apt install nodejs
   ```

2. Install PNPM version 7 following the [official site instructions](https://pnpm.io/en/installation#usando-um-script) or using the commands below for those who use Linux and have curl installed:
   ```bash
   curl -fsSL https://get.pnpm.io/install.sh | sh-
   ```

#### VSCode Prerequisites (or another IDE)

For the code style (Airbnb) to be applied and preserved, install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) in your IDE, and make sure your configuration JSON has the following parameters:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

This will ensure that ESLint and Prettier rules are applied to every save.

#### Project dependencies

To install the project dependencies, run the following command (**pnpm recommended**):

```bash
pnpm install
```

## Usage

Once you have installed the dependencies, you can start opening the project folder in your preferred text editor and start writing your AI.

### Environment Variables

To control the behavior of the build, you need to set the following environment variables:

- BRANCH: The named branch on Screeps to upload the AI to.
- SERVER: The Screeps server to upload the AI to.
- DRY_RUN: If set to true, the build **will not upload** the AI to Screeps.
- BUILD_ALL: If set to true, the build script will **build** all the scripts in the project, **not just** the main.ts file.

Copy `.env.example` to `.env` and edit it to your liking.

### Screeps credentials

To upload the AI to Screeps, you need to have a Screeps account and have a valid Screeps API Token, which you can get from your [Screeps account](https://screeps.com/a/#!/account/auth-tokens).
With the token in hand, copy `.screeps.example.yaml` to `.screeps.yaml` and add your credentials to it.

> **Note:** For more details of this file, see the [SS3: Unified Credentials File v1.0](https://github.com/screepers/screepers-standards/blob/master/SS3-Unified_Credentials_File.md)

### Building/uploading your AI

For uploading your AI, you can use the following command:

```bash
pnpm run upload
```

This instruction will **compile** your AI and **upload** it to Screeps, but if you don't want to upload it and just want to compile it to inspect the results, you can use the following command:

```bash
pnpm run build
```

## Contributing

Contributions are welcome! Make your contribution by opening an issue or creating a pull request on this repository.
