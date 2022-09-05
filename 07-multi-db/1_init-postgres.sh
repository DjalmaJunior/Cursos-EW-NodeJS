docker run \
  --name postgres_ew_multidb \
  -e POSTGRES_USER=multidb \
  -e POSTGRES_PASSWORD=pass \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres
