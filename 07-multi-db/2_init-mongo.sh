docker run \
  --name mongodb_ew_multidb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=pass \
  -d \
  mongo:4 \
  && \
docker exec -it mongodb_ew_multidb \
  mongo --host localhost -u admin -p pass --authenticationDatabase admin \
  --eval "db.getSiblingDB('herois').createUser({user: 'sistema', pwd: 'senhasistema', roles: [{role: 'readWrite', db: 'herois'}]})"
