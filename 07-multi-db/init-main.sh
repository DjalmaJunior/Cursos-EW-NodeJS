if [ -z $1 ]; then
  files=$(ls -1 | grep -P "^\d_init" | grep -P "\.sh$")

  for file in $files; do
    sh $file
  done;
elif [ $1 == '--stop' ]; then
  docker stop adminer_ew_multidb mongoclient_ew_multidb mongodb_ew_multidb postgres_ew_multidb
elif [ $1 == '--rm' ]; then
  docker stop adminer_ew_multidb mongoclient_ew_multidb mongodb_ew_multidb postgres_ew_multidb \
  && \
  docker rm adminer_ew_multidb mongoclient_ew_multidb mongodb_ew_multidb postgres_ew_multidb
fi
