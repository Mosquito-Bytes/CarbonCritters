# Carbon Critters Backend Service

To build and run the project Java 17 is required.

On Windows run

    .\gradlew.bat bootRun

On Linux/MacOS run

    ./gradlew bootRun

To build and run the Docker image

    docker build -t carbon-criters-backend:latest .
    docker run --rm v-p 8080:8080 carbon-criters-backend:latest
