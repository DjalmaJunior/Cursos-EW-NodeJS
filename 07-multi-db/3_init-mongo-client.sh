docker run \
  --name mongoclient_ew_multidb \
  -p 3000:3000 \
  --link mongodb_ew_multidb:mongodb_ew_multidb \
  -d \
  mongoclient/mongoclient
