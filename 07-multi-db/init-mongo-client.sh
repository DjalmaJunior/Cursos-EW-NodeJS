docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb \
  -d \
  mongoclient/mongoclient
