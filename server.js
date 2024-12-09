import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("./server/db.json");
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
server.use(middlewares);
server.use(router);
server.listen(5000, () => {
  console.log("Mock api server listening at localhost:5000");
});
