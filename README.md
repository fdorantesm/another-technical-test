<h1 align="center">Welcome to Backend Challenge 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/npm-%3E%3D8.1.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D16.13.0-blue.svg" />
  <a href="https://gitlab.com/mikeag96/swagger-base-structure" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://spdx.org/licenses/CC-BY-4.0.html" target="_blank">
    <img alt="License: CC--BY--4.0" src="https://img.shields.io/badge/License-CC--BY--4.0-yellow.svg" />
  </a>
</p>


## Prerequisites

- npm >=8.1.0
- node >=18.13.0
- docker

## Start your environment

### 1. Init your `.env` file

You should use the `.env.example` to create a new file with name `.env`

### 2. Install dependencies

```sh
npm ci
```

### 3. Docker Compose

You should use `docker-compose` to start your environment with all services used 

```sh
docker compose up -d
```

And access to  [http://localhost:4567](http://localhost:4567)

## Usage

You can preview in real time your changes, you need run

```bash
# development
$ npm run build -- <APP_NAME>
$ npx serverless offline
```

And access to [http://localhost:3000](http://localhost:3000)

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:coverage
```

## Migrations

```bash
# create entity
# you will have to rename the class manually following the project standards
$ npm run typeorm:create-entity apps/src/infrastructure/domain/user.entity

# create migration
# normally the file name follows the name of the action to perform: createTable, updateTable, addColumn, dropColumn
$ npm run typeorm:generate-migration database/migrations/CreateUserTable

# Run migrations
$ npm run typeorm:run-migration
```

## Seeds

```bash
# Run database/seeds/user.seed.ts
$ npm run run-seed UserSeed
```

## Docker Compose

Currently we using `docker-compose` with the next services:

### Postgres & Adminer

We use a AWS RDS to this case, we using postgresql and adminer to managmente database.

You can access to `adminer` [here](http://localhost:8080/)

### Minio as S3

We use Minio as AWS S3 Bucket, you can access to Minio console and created a new **private** bucket [here](http://localhost:9001/login), the default credentials are:

User: default_access_key
Password: default_secret_key

## Author

👤 **Umvel Inc**

* Website: https://umvel.com/

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://gitlab.com/mikeag96/swagger-base-structure/-/issues). You can also take a look at the [contributing guide](git@gitlab.com:mikeag96/swagger-base-structure/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [CC--BY--4.0](https://spdx.org/licenses/CC-BY-4.0.html) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

