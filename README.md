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

Keycloak configuration:
* Confidential client for API backend
    * Add role: `access-api`
* Add the `access-api` role to the user who should have it (ex.. Admin)
* Public client for frontend
    * In client scope `${CLIENT_NAME}-dedicated` Add Mapper
        * By configuration
        * User Realm Role
        * Name: api_roles
        * Token claim name: `resource_access.${API_CLIENT_NAME}.roles`

## Environment variables
* `KEYCLOAK_CLIENT_ID`
* `KEYCLOAK_REALM`
* `KEYCLOAK_SECRET`
* `KEYCLOAK_URL`
* `LIFE_MANAGER_FRONTEND_URL`
* `REDIS_URL`
* `SESSION_SECRET`

