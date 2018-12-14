pipeline {
  environment {
          CAADE_REGISTRY = 'localhost:5000'
  }
  stages {
  stage ('Build') {
        parallel {
            stage('Build Docs') {
              steps {
                sh 'npm run build-doc'
              }
            }
            stage('Build Services') {
              steps {
                sh 'npm run-script build'
                sh 'npm run-script deploy-apps'
              }
            }
        }
    }
    stage('Test') {
      agent {
        label 'docker-master'
      }
      steps {
        sh 'npm run deploy-test'
        sh 'npm run test'
        sh 'npm run teardown-test'
      }
      post {
        always {
          junit "report.xml"
        }
      }
    }
    stage('Production') {
      steps {
        sh 'npm run deploy-prod'
      }
    }
  }
}
