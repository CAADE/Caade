FROM docker:17.03-rc
MAINTAINER Darren Pulsipher <darren@pulsipher.org>

RUN apk --update add openjdk8-jre git fontconfig ttf-dejavu

RUN apk --update add nodejs graphviz

RUN wget -O swarm-client.jar http://repo.jenkins-ci.org/releases/org/jenkins-ci/plugins/swarm-client/3.14/swarm-client-3.14.jar

COPY entrypoint.sh /

RUN chmod +x /entrypoint.sh  \
    && sed -i -e 's/\r$//' /entrypoint.sh

CMD ["/entrypoint.sh"]
