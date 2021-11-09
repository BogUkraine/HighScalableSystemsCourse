MAIN_CONTAINER_NAME=mongo_main_container
SERV1_CONTAINER_NAME=confserv1
ROUTER_CONTAINER_NAME=router

SERV1_ADDRESS=confserv1:27017
ROUTER_ADDRESS=router:27017
SHARD1_SERVER1_ADDRESS=shard1svr1:27017
SHARD2_SERVER1_ADDRESS=shard2svr1:27017

# Up main container and create a network
echo 'starting main'
docker-compose up -d

# Up config servers container
echo 'starting config servers'
docker-compose -f ./config/docker-compose.yaml --env-file ./.env up -d

sleep 5

# init replica set for config servers
echo 'starting replica set for config servers'
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$SERV1_ADDRESS --eval 'rs.initiate({ _id: "configs_set", configsvr: true, members: [{ _id : 0, host : "confserv1:27017" }, { _id : 1, host : "confserv2:27017" }, { _id : 2, host : "confserv3:27017" } ]})'
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$SERV1_ADDRESS --eval 'rs.status()'
echo 'config servers are ready'

# Up router container
docker-compose -f ./router/docker-compose.yaml --env-file ./.env up -d

sleep 5

# Up data shard 1
docker-compose -f ./data/shard1/docker-compose.yaml --env-file ./.env up -d

# Up data shard 2
docker-compose -f ./data/shard2/docker-compose.yaml --env-file ./.env up -d

sleep 5

# init replica set for shard
echo 'start to initiate a shard'
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$SHARD1_SERVER1_ADDRESS --eval 'rs.initiate({_id: "shard1_set",members: [{ _id : 0, host : "shard1svr1:27017" },{ _id : 1, host : "shard1svr2:27017" },{ _id : 2, host : "shard1svr3:27017" }]})'
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$SHARD1_SERVER1_ADDRESS --eval 'rs.status()'
echo 'shard is ready'

# init replica set for shard
echo 'start to initiate a shard'
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$SHARD2_SERVER1_ADDRESS --eval 'rs.initiate({_id: "shard2_set",members: [{ _id : 0, host : "shard2svr1:27017" },{ _id : 1, host : "shard2svr2:27017" },{ _id : 2, host : "shard2svr3:27017" }]})'
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$SHARD2_SERVER1_ADDRESS --eval 'rs.status()'
echo 'shard is ready'

sleep 5

# add shard 1 to mongos
echo 'start to add shard 1 to mongos'
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$ROUTER_ADDRESS --eval 'sh.addShard("shard1_set/shard1svr1:27017,shard1svr2:27017,shard1svr3:27017")'
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$ROUTER_ADDRESS --eval 'sh.status()'
echo 'finish'

# add shard 2 to mongos
echo 'start to add shard 2 to mongos'
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$ROUTER_ADDRESS --eval 'sh.addShard("shard2_set/shard2svr1:27017,shard2svr2:27017,shard2svr3:27017")'
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$ROUTER_ADDRESS --eval 'sh.status()'
echo 'finish'

# Up compass container
docker-compose -f ./compass/docker-compose.yaml --env-file ./.env up -d
echo 'done'