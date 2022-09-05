docker run \
  --name adminer_ew_multidb \
  -p 8080:8080 \
  --link postgres_ew_multidb:postgres_ew_multidb \
  -d \
  adminer
