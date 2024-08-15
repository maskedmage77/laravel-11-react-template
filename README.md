# README

## Description

- Laravel 11 with Mantine.

## Installation

### Development 

```bash
docker compose -f docker-compose.dev.yml up --build -d
```

Shell into container

```
docker exec -it laravel-11-mantine-app sh
```

Install node packages

```
npm install
```

Running vite dev server

```
npm run dev
```


### Production

```bash
docker compose -f docker-compose.prod.yml up --build -d

```
