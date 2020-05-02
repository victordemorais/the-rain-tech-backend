const server = require("./server");
const port = 3333 || process.env.PORT;

server.listen(port, () => {
  console.log(`Example of app using http://localhost:${port}`);
});
