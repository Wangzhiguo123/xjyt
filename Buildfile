#!/usr/bin/env groovy

pipeline {
    agent { label "${BUILD_NODE}" }
    options {
        timestamps()
        timeout(15)
    }
    stages {
        stage('Build') {
            steps {
				dir("${WORKSPACE}"){
					echo "${WORKSPACE}"
					echo env.BRANCH_NAME
					sh """
                    ${NODEJS_BUILD_ARGS}
                    """
				}
            }
        }

        //stage('单元测试') {
        //    steps {
        //        script {
        //            if ("${ENV}" == 'test' || "${ENV}" == 'dev') {
        //                sh 'mvn test'
        //            }
        //        }
        //    }
        //}

        //stage('ut-coverage') {
        //    steps {
        //        sh 'mvn cobertura:cobertura -Dcobertura.report.format=xml'
        //    }
        //}

        //stage('质量扫描') {
        //    steps {
        //        withSonarQubeEnv('SonarQube') {
        //            sh 'mvn sonar:sonar -P jacoco'
        //        }
        //    }
        //}
        
        stage('制作镜像') {
            steps {
                echo 'Deploying'
                dir("${WORKSPACE}"){
					echo "${WORKSPACE}"
                    sh """
cd dist && \
cat >Dockerfile <<EOF
FROM nginx:1.21.1
RUN rm -rf /etc/nginx/conf.d
COPY . /usr/share/nginx/html
EXPOSE 80
EOF
"""

                    sh """
                        cd dist && \
                        docker rmi -f "${DEPLOY_IMAGE}" || true \
                        && docker build -t "${DEPLOY_IMAGE}" . \
                        && docker push "${DEPLOY_IMAGE}"
                    """
                }
            }
        }
        stage('部署到业务集群') {
            steps {
                script {
                    if ("${ENV}" == 'test') {
                        echo '正在发布到测试集群'
                        echo "${TEST_RANCHER_API}"
                        rancherRedeploy alwaysPull: true, credential: "${RANCHER_TOKEN}", images: "${DEPLOY_IMAGE}", workload: "${TEST_RANCHER_API}"
                    } else if ("${ENV}" == 'dev') {
                        echo '正在发布到开发集群'
                        echo "${DEV_RANCHER_API}"
                        rancherRedeploy alwaysPull: true, credential: "${RANCHER_TOKEN}", images: "${DEPLOY_IMAGE}", workload: "${DEV_RANCHER_API}"
                    }
                }
            }
        }
    }
}