MAIN_CONTAINER_NAME=mongo_main_container
SERV1_ADDRESS=confserv1:27017
ROUTER_ADDRESS=router:27017
SHARD1_SERVER1_ADDRESS=shard1svr1:27017
SHARD2_SERVER1_ADDRESS=shard2svr1:27017

# check config servers
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$SERV1_ADDRESS --eval 'rs.status()'

# check shards
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$SHARD1_SERVER1_ADDRESS --eval 'rs.status()'
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$SHARD2_SERVER1_ADDRESS --eval 'rs.status()'

# check mongos
docker exec -it $MAIN_CONTAINER_NAME mongo mongodb://$ROUTER_ADDRESS --eval 'sh.status()'