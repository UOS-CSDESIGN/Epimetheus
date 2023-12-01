PROJECT_ROOT="/home/ubuntu/jenkins"
JAR_FILE="$PROJECT_ROOT/epimetheus.jar"
CONTAINER_NAME="node-validation-server"

APP_LOG="$PROJECT_ROOT/application.log"
ERROR_LOG="$PROJECT_ROOT/error.log"
DEPLOY_LOG="$PROJECT_ROOT/deploy.log"

echo "$TIME_NOW > Rename to $JAR_FILE" >> $DEPLOY_LOG
cp $PROJECT_ROOT/build/libs/epimetheus-*\.jar $JAR_FILE

echo "$TIME_NOW > Run $JAR_FILE" >> $DEPLOY_LOG
nohup java -jar $JAR_FILE > $APP_LOG 2> $ERROR_LOG &

CURRENT_PID=$(pgrep -f $JAR_FILE)
echo "$TIME_NOW > Current PID: $CURRENT_PID" >> $DEPLOY_LOG

sudo docker run -d -p 3000:3000 --name $CONTAINER_NAME tank3a/code-validation