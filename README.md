# Life Manager API

API backend for Life Manager system

## Run redis
```
docker run --rm --name some-redis -p 6379:6379 -d redis redis-server --save 60 1 --loglevel warning
```

## Run keycloak
```
docker run --rm -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.1.2 start-dev
```

## Environment variables
* `LIFE_MANAGER_FRONTEND_URL`
* `REDIS_URL`
* `SESSION_SECRET`

