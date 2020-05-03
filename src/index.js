const server = require("./server");
const port = 3333 || process.env.PORT;

server.listen(port, () => {
  console.log(`App using http://localhost:${port}`);
});
