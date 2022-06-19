const http = require("http");
// Listener
const server = http.createServer((request, response) => {
  //   console.log("Request URL", request.url);
  //   console.log("Request Method", request.method);
  //   console.log("Request header ", request.headers);

  if (request.url === "/") {
    response.write("<h1 style='color:green'>Welcome Home Page</h1>");
    response.end();
  } else if (request.url === "/about") {
    response.write("<h1 style='color:blue'>Welcome About Me Page</h1>");
    response.end();
  } else {
    response.write("<h1 style='color:red'>WARN.! ERROR 404</h1>");
    response.end();
  }
});
/* normalde node çalışır ve biter ama server -sunucu- olarak..
... çalıştırmak istiyorsak eğer sürekli çalıştırmamız gerekir.
Bunun için de listern metodu kullanmalı. İçerisine de dinlecek port verilir.

*/
server.listen(3000);
