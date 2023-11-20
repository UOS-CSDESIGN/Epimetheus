localfile=$1
containerId=$2
fileDir=$3

sudo docker cp $localfile $containerId:$fileDir
