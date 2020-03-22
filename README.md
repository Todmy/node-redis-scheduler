## Requirements
To run this app you need installed `Docker` and ```docker-compose```.

## Running locally
To start the app:
```
docker-compose up
```
This command runs a few docker containers in the foreground. For a better experience, I recommend running this command with the key `-d`. It runs Docker containers in the background. To lookup for existing docker containers, you can run
```
docker ps
```
than you can pick needed container by `NAME` or `CONTAINER_ID` and run its logs by:
```
docker logs <NAME/CONTAINER_ID> -f
```
To stop docker-compose, run:
```
docker-compose down
```