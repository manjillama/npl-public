<h3 align="center">
  Here's to an easier digital Nepal 🙌.
</h3>

<p align="center">
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <a href="https://www.npmjs.com/package/eslint-config-airbnb-typescript"><img alt="code style: airbnb" src="https://img.shields.io/badge/code%20style-airbnb-red"></a>
  <a href="https://github.com/facebook/jest"><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="Tested with Jest"></a>
</p>

## Project Introduction

Open-source platform dedicated to make daily life of Nepalese people bit easier, starting by mapping locations all the public restrooms.

- api: API server
- app: Mobile app
- dashboard: Admin dashboard

## Individual setup

- For individual setup, refer to the specific project folder.

## All-in-one Setup (docker)

- In the root project folder, copy the `.env.docker` and save as `.env`. Update the variables.

- Run `docker-compose up` from the root folder to run all the applications at once. To run a specific application use `docker-compose up <service_name>`. To run the application in background, use `docker-compose up -d <service_name>`. The logs can be seen through `docker-compose logs`.

- Checkout the applications through `http://localhost:<PORT>`.

- Run `docker-compose ps` from the root folder to check the status of the containers.

- You can also execute the commands as usual by entering into the container: `docker-compose exec <service_name> bash`. It gives a bash shell.

## License

See the [LICENSE](./LICENSE) file for licensing information.
