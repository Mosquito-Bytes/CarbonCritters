#TODO Find a better way to build the native image
FROM ubuntu:22.04 AS builder
ADD ./gradle gradle
ADD ./src src
ADD ./gradlew gradlew
ADD ./build.gradle.kts build.gradle.kts
ADD ./settings.gradle.kts settings.gradle.kts
RUN apt update && apt -y install build-essential libz-dev zlib1g-dev wget
RUN wget -q https://download.oracle.com/graalvm/17/latest/graalvm-jdk-17_linux-x64_bin.tar.gz
RUN tar xf graalvm-jdk-17_linux-x64_bin.tar.gz
RUN export JAVA_HOME=/graalvm-jdk-17.0.9+11.1/;./gradlew nativeCompile

FROM ubuntu:22.04
COPY --from=builder build/native/nativeCompile/carboncritters carboncritters
ENTRYPOINT ["./carboncritters"]
