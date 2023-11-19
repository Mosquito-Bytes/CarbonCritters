FROM eclipse-temurin:17-jdk AS builder
ADD ./gradle gradle
ADD ./src src
ADD ./gradlew gradlew
ADD ./build.gradle.kts build.gradle.kts
ADD ./settings.gradle.kts settings.gradle.kts
RUN ./gradlew build

FROM eclipse-temurin:17-jdk
COPY --from=builder build/libs/carboncritters-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
