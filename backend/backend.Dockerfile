#FROM eclipse-temurin:21 AS image-with-jar
#WORKDIR /backend

#RUN ./mvnw clean package

FROM eclipse-temurin:21
WORKDIR /backend
COPY . .
COPY ./target/personal-task-dashboard-project-*-SNAPSHOT.jar ./backend.jar
ENTRYPOINT ["java", "-jar", "backend.jar"]