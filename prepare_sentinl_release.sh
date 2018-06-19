#!/bin/bash

SENTINL_PATH="/home/havlan/Documents/havlan_sentinl/target/gulp"
SENTINL_VERSION=$1
COPY_PATH=$SENTINL_PATH"/sentinl-v$SENTINL_VERSION.zip" 

echo $COPY_PATH
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
else
  cp $COPY_PATH /home/havlan/Documents/docker-ELKstack/kibana/config
  echo Copied sentinl release!

fi
