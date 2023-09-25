#!/bin/bash

PRODUCTID=$1
VERSION=$2

curl -d "key=3f5bb68dd9&version=${VERSION}&pid=${PRODUCTID}" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -X POST https://imagi.ro/api/versions/new
