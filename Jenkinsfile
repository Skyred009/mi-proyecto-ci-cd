pipeline {
  agent any

  environment {
    NODE_VERSION = 'lts/*'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Instalar dependencias') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Tests') {
      steps {
        sh 'npm test --silent'
      }
    }

    stage('Deploy') {
      when {
        branch 'main'
      }
      steps {
        withCredentials([string(credentialsId: 'render-deploy-hook', variable: 'RENDER_DEPLOY_HOOK')]) {
          sh '''
            if [ -n "$RENDER_DEPLOY_HOOK" ]; then
              curl -s -X POST "$RENDER_DEPLOY_HOOK"
              echo "Deploy hook ejecutado."
            else
              echo "Credencial render-deploy-hook no configurada; omitiendo deploy."
            fi
          '''
        }
      }
    }
  }

  post {
    always {
      cleanWs(deleteDirs: true, patterns: [[pattern: 'node_modules', type: 'INCLUDE']])
    }
  }
}
