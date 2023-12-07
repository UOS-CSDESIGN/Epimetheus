PROJECT_ROOT="/home/ubuntu/jenkins"
JAR_FILE="$PROJECT_ROOT/epimetheus.jar"
# CONTAINER_NAME="node-validation-server"

CURRENT_PID=$(pgrep -f $JAR_FILE)
DEPLOY_LOG="$PROJECT_ROOT/deploy.log"

if [ -z $CURRENT_PID ]; then
  echo "$TIME_NOW > 이전에 실행중인 SpringBoot Server가 존재하지 않습니다." >> $DEPLOY_LOG
else
  echo "$TIME_NOW > 실행 중인 $CURRENT_PID 애플리케이션을 종료합니다." >> $DEPLOY_LOG
  sudo kill -9 $CURRENT_PID
fi

# sudo docker stop $CONTAINER_NAME
#sudo docker rm $CONTAINER_NAME