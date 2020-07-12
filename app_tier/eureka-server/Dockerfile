FROM openjdk:8-jdk

ADD build/libs/balancer-eureka-server-0.0.1-SNAPSHOT.jar balancer-eureka-server.jar

EXPOSE 8761

ENTRYPOINT [ "java", "-Xmx128m", "-Xms128m" ]
CMD ["-jar", "-Dspring.profiles.active=production", "balancer-eureka-server.jar"]