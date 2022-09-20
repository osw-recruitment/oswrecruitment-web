#!/bin/bash
stage="$1"

echo ">>> Building react-js application using 'yarn build'"
if [ "$stage" == "" ]
then
    echo ">>>>> No stage detected! Setting default to dev"
    yarn build:dev
else
    yarn build:"$stage"
fi

echo ">>> Deploying application to firebase"
if [ "$stage" == "" ]
then
    echo ">>>>> No stage detected! Setting default to dev"
    firebase deploy -P dev
else
    firebase deploy -P "$stage"
fi