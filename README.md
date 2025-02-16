<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

A template for NestJS project with

- [NestJS](https://nestjs.com/) for serving HTTP servers
- [Knex](https://knexjs.org/) for database-related operations
- [Commander](https://github.com/tj/commander.js) for CLI support

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# Discover options by yourself
$ npm start -- -- --help
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## With Docker

```bash
# coming soon
docker compose -p minest -f docker-compose.dev.yaml up -d
```

## Using another database

- Update `docker-compose.dev.yaml` + `.env` to your new database config
- Remove `mysql2` driver from `package.json`
- Install your database driver. More info at [Knex Guide](https://knexjs.org/guide/#node-js)
- Update the `client` to your database driver in `./src/config/database.ts` - `const createKnexClient()`

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
