# Up main container and create a network
echo 'starting main'
docker-compose up -d

# Up config servers container
echo 'starting config servers'
docker-compose -f ./config/docker-compose.yaml --env-file ./.env up -d

sleep 5

# Up router container
docker-compose -f ./router/docker-compose.yaml --env-file ./.env up -d

sleep 5

# Up data shard 1
docker-compose -f ./data/shard1/docker-compose.yaml --env-file ./.env up -d

# Up data shard 2
docker-compose -f ./data/shard2/docker-compose.yaml --env-file ./.env up -d

sleep 5

# Up compass container
docker-compose -f ./compass/docker-compose.yaml --env-file ./.env up -d
echo 'done'