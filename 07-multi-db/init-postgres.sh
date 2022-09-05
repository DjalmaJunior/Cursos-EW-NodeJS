docker run \
  --name postgres \
  -e POSTGRES_USER=multidb \
  -e POSTGRES_PASSWORD=pass \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres
