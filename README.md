## Requirements
To run this app you need installed `Docker` and ```docker-compose```.

## Running locally
To start the app:
```
docker-compose up
```
This command runs a few docker containers in the foreground. For a better experience, I recommend running this command with the key `-d`. It runs Docker containers in the background. To lookup for existing docker containers, you can run:
```
docker ps
```
then you can pick needed container by `NAME` or `CONTAINER_ID` and run its logs by:
```
docker logs <NAME/CONTAINER_ID> -f
```
To stop the docker-compose, run:
```
docker-compose down
```

### Interesting notes of this example:
1) Correctly handle data from different timezones
2) Module structure will allow to split it to microservices
3) Only once print a message to console. Even if few instances communicate with Redis.
4) After shutdown reviews and prints all expired messages(should be improved) 
   
### TODO:
1) tests
2) improve printing messages after shutdown (look at rsmq and redis scripts)
3) redis replication 
