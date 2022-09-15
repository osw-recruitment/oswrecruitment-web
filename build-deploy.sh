#!/bin/bash
echo ">>> Building react-js application using 'yarn build'"
yarn build

echo ">>> Deploying application to firebase"
firebase deploy
