pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                sh '''
                    rm -rf Epimetheus
                    mkdir Epimetheus
                    cd Epimetheus
                    git init
                    git remote add -f origin https://github.com/UOS-CSDESIGN/Epimetheus/
                    git config core.sparseCheckout true
                    echo "backend/epimetheus/" >> .git/info/sparse-checkout
                    git pull origin main
                '''
            }
        }
        
        stage('Add Env') {
            steps {
                dir('Epimetheus/backend/epimetheus') {
                    withCredentials([file(credentialsId: 'application', variable: 'application')]) {
                        sh 'cp ${application} src/main/resources/application.yml'
                    }
                }
            }
        }

        stage('Clean and Build') {
            steps {
                dir('Epimetheus/backend/epimetheus') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean build'
                }
            }
        }
        
        stage('Zip & Send To S3 Bucket') {
            steps {
                script {
                    def zipFileName = "springServer-${env.BUILD_NUMBER}.zip"
                    dir('Epimetheus/backend/epimetheus') {
                        sh "zip -r ${zipFileName} build/libs/epimetheus-*SNAPSHOT.jar appspec.yml scripts/"
                        sh "aws s3 cp ${zipFileName} s3://spring-build-bucket/"
                    }
                }
            }
        }
        
        stage('Deploy to AWS CodeDeploy') {
            steps {
                script {
                    def zipFileName = "springServer-${env.BUILD_NUMBER}.zip"
                    sh '''
                        aws deploy create-deployment \
                          --application-name spring-deploy \
                          --deployment-config-name CodeDeployDefault.OneAtATime \
                          --deployment-group-name SpringBootDeployGroup \
                          --s3-location bucket=spring-build-bucket,key=''' + zipFileName + ''',bundleType=zip \
                          --region ap-northeast-2
                    '''
                }
            }
        }
    }
}
