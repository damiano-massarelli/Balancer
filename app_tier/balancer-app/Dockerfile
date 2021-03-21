FROM openjdk:8-jdk

ADD build/libs/balancer-0.0.1-SNAPSHOT.jar balancer.jar

EXPOSE 8092

ENTRYPOINT [ "java", "-Xmx128m", "-Xms128m" ]
CMD ["-jar", "-Dspring.profiles.active=production", "balancer.jar"]