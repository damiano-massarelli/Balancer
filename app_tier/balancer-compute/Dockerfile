FROM openjdk:8-jdk

ADD build/libs/balancer-compute-0.0.1-SNAPSHOT.jar balancer-compute.jar

EXPOSE 8093

ENTRYPOINT [ "java", "-Xmx128m", "-Xms128m" ]
CMD ["-jar", "-Dspring.profiles.active=production", "balancer-compute.jar"]