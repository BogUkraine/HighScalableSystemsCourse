Building Docker Environment

Infrastructure:
Task 1. Hello-world
Task 2. Lite-server
Task 3. JSON-server
Task 4. Nginx + Lite-server’s + JSON-server’s
Task 5. Postman
Report

Task 1. Hello-world
Prerequisites:
Install docker and docker-compose.
Links:
https://docs.docker.com/compose/compose-file/
https://hub.docker.com/_/hello-world
Description:
Pull docker image “hello-world”.
Create docker-compose.yaml for container deploying.
Deploy container and test the result.
Goals:
Check availability of container
Setup basic configuration for docker-compose file
Make sure the configuration is correct
Become experience with docker cli and docker-compose cli

## RUN docker-compose
```docker-compose up```

Task 2. Lite-server
Prerequisites:
Install docker and docker-compose.
Links:
https://hub.docker.com/_/node
https://www.npmjs.com/package/lite-server
Description:
Pull docker image “node”.
Create docker-compose.yaml for container with lite-server.
Create static resources for container.
Deploy container and test the result.
Goals:
Setup volumes mounting
Setup ports forwarding
Setup environment
Check availability of resources via port

## RUN docker-compose
```docker-compose --env-file ./.env up```

Task 3. JSON-server
Prerequisites:
Install docker and docker-compose.
Links:
https://hub.docker.com/_/node
https://www.npmjs.com/package/json-server
Description:
Pull docker image “node”.
Create docker-compose.yaml for container with JSON-server.
Create JSON-data for container.
Deploy container and test the result.
Goals:
Setup volumes mounting
Setup ports forwarding
Setup environment
Check availability of REST resources in container

## RUN docker-compose
```docker-compose --env-file ./.env up```

### The main idea of a solution is to be able to up a container without rebuilding the image.
### This way, you can handle json-server starting port by passing it throught env variables.
### If you want to pass arguments to Dockerfile with env variables, it will be built once with
### 'first build' variables.


Task 4. Nginx + lite-server’s + JSON-server’s
Prerequisites:
Install docker and docker-compose.
Done tasks: 2, 3.
Links:
https://hub.docker.com/_/nginx
http://nginx.org/en/docs/
Description:
Pull docker image “nginx”.
Create docker-compose.yaml for containers:
- nginx
- lite-server’s (no port forwarding)
- JSON-server’s (no port forwarding)
Scale lite-server containers up to 3.
Scale JSON-server containers up to 3.
Deploy containers and test the result.
Goals:
Setup volumes mounting
Setup ports forwarding
Setup environment
Check availability of REST resources in container

## RUN docker-compose
```docker-compose --env-file ./.env up --scale json-server-node=3 --scale lite-server-node=3```

Task 5. Postman
Prerequisites:
Done task 4.
Links:
https://www.postman.com/
Description:
Create request-collection for all routes in deployed containers.
Test the result.
Goals:
Check availability of all routes in container
 
Report
Links:
https://github.com
Description:
Report results as public git repository with all data and env’s.
Goals:
Create public repository at github.com
Save all tasks to created repository as separate folder (task-1, task-2, task-3, task-4, task-5)
Submit link to create repository to Class as answer
 
 
 
