FROM node:16

ARG JSON_SERVER_PORT 8000
ENV JSON_SERVER_PORT ${JSON_SERVER_PORT}

RUN npm i -g json-server

CMD json-server --port ${JSON_SERVER_PORT} --host 0.0.0.0 --watch /home/node/lab/db.json