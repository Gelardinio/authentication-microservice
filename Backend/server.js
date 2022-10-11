const express = require("express");
const redis = require("redis");

const PORT = process.env.PORT || 3001;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});