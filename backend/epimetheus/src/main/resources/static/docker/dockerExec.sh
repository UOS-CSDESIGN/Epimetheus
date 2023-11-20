#!/bin/bash
containerId=$1
fileDir=$2

sudo docker exec $containerId node $fileDir