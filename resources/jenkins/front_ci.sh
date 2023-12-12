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
                    echo "frontend/" >> .git/info/sparse-checkout
                    git pull origin main
                '''
            }
        }
        
        stage('Add Env') {
            steps {
                dir('Epimetheus/frontend') {
                    withCredentials([file(credentialsId: 'env', variable: 'env')]) {
                        sh 'cp ${env} .env'
                    }
                }
            }
        }

	stage('Install Node Modules') {
            steps {
                dir('Epimetheus/frontend') {
                    sh '''
                        npm install
                    '''
                }
            }
	}


        stage('Build') {
            steps {
                dir('Epimetheus/frontend') {
                    sh '''
                        CI=false npm run build
                    '''
                }
            }
        }
        
        stage('Zip & Send To S3 Bucket') {
            steps {
                script {
                    def zipFileName = "reactApp-${env.BUILD_NUMBER}.zip"
                    dir('Epimetheus/frontend') {
                        sh "zip -r ${zipFileName} build/"
                        sh "aws s3 cp ${zipFileName} s3://react-build-bucket/"
                    }
                }
            }
        }
    }
}
