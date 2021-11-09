Building MongoDB Environment

Infrastructure:
Task 1. MongoDB sharding
Task 2. Import and balance data
Task 3. Generate more data
Task 4. Analyse more data
Task 5. Visualize data (bonus task)

Task 1. MongoDB sharding
Prerequisites:
Install docker and docker-compose.
Links:
https://docs.docker.com/compose/compose-file/
https://hub.docker.com/_/mongo
Description:
Pull docker image “mongo”.
Create docker-compose.yaml for containers:
- mongo (one port forwarding, with mongos main process)
- mongo (no port forwarding, config servers process)
- mongo (no port forwarding, data servers process)
- mongo (no port forwarding, data replica servers process)
Scale “mongo config server” containers up to 3.
Scale “mongo data server containers” up to 4.
Scale “mongo data replica server” 2 for each “mongo config server”.
Make a secure connection between all “mongo server’s”.
Deploy containers and test the result.
Goals:
Setup configuration for docker-compose file
Make sure the configuration is correct
Become experience with mongo cli and mongo configuration

-



Task 2. Import and balance data
Prerequisites:
Done task 1.
Links:
https://www.doogal.co.uk/london_postcodes.php
https://data.london.gov.uk/dataset/postcode-directory-for-london
Description:
Import London addresses.
Test the result.
Goals:
Become experience with mongo connection.
 
Task 3. Generate more data
Prerequisites:
Done task 2.
Description:
Use London addresses for simulations below.
Simulate taxi orders and store in base (with custom intensity).
Simulate taxi movement tracking and store in base (up to 10GB data).
Taxi without order are moving at nearest area.
Simulate taxi drive feedback and store in base.
Test the result.
Goals:
Become experience with mongo CRUD.
 
Task 4. Analyse more data
Prerequisites:
Done task 3.
Description:
Analyse drives and feedbacks according to variant in Lab 5.
Goals:
Become experience with mongo map-reduce operations
 
Task 5. Visualize data (bonus task)
Prerequisites:
Done task 3.
Description:
Visualize taxi movement using map API.
Goals:
Become experience with map API
 
## Extra
**mongod** is the primary daemon process for the MongoDB system. It handles data requests, manages data access, and performs background management operations.

**--configsvr**<br />
*Required if starting a config server.*<br />
Declares that this mongod instance serves as the config server of a sharded cluster. When running with this option, clients (i.e. other cluster components) cannot write data to any database other than config and admin. The default port for a mongod with this option is 27019 and the default --dbpath directory is /data/configdb, unless specified.

**--replSet** <setname><br />
Configures replication. Specify a replica set name as an argument to this set. All hosts in the replica set must have the same set name.<br />
If your application connects to more than one replica set, each set must have a distinct name. Some drivers group replica set connections by replica set name.


# RESUME
If you run it for the first time:</br>
Preparation:</br>
If you want to set certificates checking between nodes: https://www.percona.com/blog/2018/05/31/mongodb-deploy-replica-set-with-transport-encryption-part-3/
**Set file in router/imports directory. We will need it to import data later**</br>
1. Run bash init.sh - it will up 3 config servers, main server, router (mongos) server, compass and 2 shards with 3 instances for each of the shards. Moreover, it initiates replica sets and adds shards to mongos. 
2. Run bash check-status.sh - it will check if your replica sets are ready and initialized.
3. Create db and enable sharding, create collection:
* docker exec -it *router_container* bash
* mongo mongodb://router:27017
* use *database_name*
* sh.enableSharding("*database_name*")
* db.createCollection("*collection_name*")
4. Import data to your db.
* docker exec -it *router_container* bash
* mongoimport --host *host* --port *port* --type csv -d *database* -c *collection* --headerline *name.csv* (if you changed nothing in steps above, here is a quick copy&paste ```mongoimport --host router --port 27017 --type csv -d lab3 -c postcodes --headerline ./imports/Londonpostcodes.csv```)
5. Shard imported data
* db.*collection_name*.createIndex({ *field*: 1 })
* sh.shardCollection("*db_name*.*collection_name*", { *field*: 1 } )

## Task3
* docker exec -it *router_container* bash
* mongo mongodb://router:27017
* use lab3
* db.createCollection("orders")
* db.orders.createIndex({ driverId: 1 }) !!!
* sh.shardCollection("lab3.orders", { driverId: 1 } ) ???
* exit
* cd seeds
* mongo users-seed.js
* mongo drvers-seed.js
* mongo orders-seed.js

## Task4
Analize data with map reduce</br>
Top 50 drivers who drive at night</br>

```
db.orders_test.mapReduce(
    function() {
        emit(this.driverId, this.createdAtHours)
    },
    function (key, values) {
        return values.length
    },
    { 
        query: db.orders_test.aggregate([{ $project: { _id: 1, createdAt: 1, createdAtHours: { $hour: "$createdAt" } } }, { $match: { createdAtHours: { "$in": [21,22,23,0,1,2,3,4,5] } } }]), // here is an error
        out: "top_drivers_at_night"
    }
)
```

Top 100 drivers who got the most money:
```
db.orders.mapReduce(
    function() {
        emit(this.driverId, this.price)
    },
    function (key, values) {
        return Array.sum(values)
    },
    { 
        out: "richest_drivers_"
    }
)

db.richest_drivers_.find().sort({value: -1}).limit(100)
```

## Task5
* Folder node-server contains simple nodejs server. Just run node index
* Open index.html file in node-server/front folder. It makes a request to node server and vizualise 



If you killed containers, no worries, we still have volumes. Follow next steps to run everything:</br>
1. bash init-second-time.sh