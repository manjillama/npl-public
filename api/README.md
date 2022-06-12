<div align="center">

![](https://raw.githubusercontent.com/manjillama/yatri-motorcycles-api/master/yatri.png)

</div>

<h3 align="center">
  Nepal public restroom api platform. Balen for us, we for Balen.
</h3>

<p align="center">
  <a href="https://twitter.com/YATRIdesign"><img src="https://img.shields.io/twitter/follow/YATRIdesign?style=social" alt="Twitter Follow" /></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <a href="https://yatrimotorcycles.slack.com">
    <img src="https://img.shields.io/badge/join-slack-purple" alt="Strapi on Slack" />
  </a>
  <a href="https://www.npmjs.com/package/eslint-config-airbnb-typescript"><img alt="code style: airbnb" src="https://img.shields.io/badge/code%20style-airbnb-red"></a>
  <a href="https://github.com/facebook/jest"><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="Tested with Jest"></a>
</p>

## Project Introduction

**Public restroom API server** is currently created using Node.js on the top of Express framework and TypeScript. For database, we've decided to go with MongoDB and and Mongoose as an ODM.

## Folder structure

```
|-- migrations        # Database migration dir
|-- tests             # All unit and integration test files goes here
|-- .husky            # Husky hooks for git pre-commits for lint check
|-- src
    |   index.js      # App entry point
    |   app.js        # Load express application modules
    |-- config        # Environment variables and configuration related stuff
    |-- constants     # App constants
    |-- controllers   # Express route controllers
    |-- interfaces    # TypeScript interfaces
    |-- middlewares   # Express middlewares
    |-- models        # Mongoose models
    |-- routes        # Express routes
    |-- services      # Service modules
    |-- startup       # Split the startup process into modules
    |-- types         # Shared TypeScript types
    |-- utils         # Shared utilities modules
```

## Requirements

- NodeJS >= 12.x
- Yarn >= 1.x
- MongoDB >= 4.2

## Setup

First of all, you need to check if you're using the required versions of Node.js and npm <br/>

Then, please follow the instructions below:

### Clone the repo:

```bash
$ git clone https://github.com/yatri-motorcycles/np-public-restroom.git

$ cd api
```

Install dependencies:

```bash
$ yarn
```

Set environment variables:

```bash
$ cp .env.docker .env
```

Import sample documents

```bash
$ yarn seed:import
```

### Running Locally

```bash
$ yarn dev
```

## Available Scripts

In the project directory, you can run:

### Lint

```bash
# lint code with ESLint
$ yarn lint

# try to fix ESLint errors
$ yarn lint:fix
```

### Test

```bash
# run all tests with Mocha
$ yarn test
```

### Validate

```bash
# run lint and tests
$ yarn validate
```

### Run debugger

```bash
$ yarn debug
```

### Populate database collections with sample documents

```bash
$ yarn seed:import
```

### Clear all database documents

```bash
$ yarn seed:delete
```

## Contributing guide

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.
