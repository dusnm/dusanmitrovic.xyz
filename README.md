# dusanmitrovic.xyz
Source code for my website.

## Table of contents
* [Dependencies](#dependencies)
* [Configuration](#configuration)
* [Install application dependencies](#install-application-dependencies)
* [Run migrations](#run-migrations)
* [Run seeds](#run-seeds)
* [Run the development server](#run-the-development-server)

### Dependencies
* Node `>=v12`
* npm `>=v6`
* MariaDB
* Redis
* Nginx (configuration provided)
* knex-cli

### Configuration
Generate a self-signed SSL certificate for local development
```shell
./generate_certificate
```

Create a copy of the included `.env.example` file and fill it with relevant information.
```shell
cp .env.example .env
```

### Install application dependencies
1. `npm install`
2. `sudo npm install -g knex`

### Run migrations
```shell
knex migrate:latest
```

### Run seeds
```shell
knex seed:run
```

### Run the development server
```shell
npm run dev
```
