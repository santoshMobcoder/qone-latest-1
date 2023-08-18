pipeline {
    agent any
    stages {
        stage('Code') {
            steps {
                echo 'stage code==================================================================================================='
                git url: "https://github.com/santoshMobcoder/qone-latest-1.git", branch: "main"
            }
        }
         stage('Build') {
            steps {
                echo 'stage build==================================================================================================='
                sh "docker compose build"
            }
        }
         stage('Deploy') {
            steps {
                echo 'stage deploy==================================================================================================='
                sh "docker compose down && docker compose up -d"
            }
        }
    }
}
