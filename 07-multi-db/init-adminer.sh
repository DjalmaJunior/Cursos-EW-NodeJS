docker run \
  --name adminer \
  -p 8080:8080 \
  --link postgres:postgres \
  -d \
  adminer
