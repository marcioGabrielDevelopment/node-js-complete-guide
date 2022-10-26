const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    //res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter A Message..</title></head>");
    res.write(
      "<body><form action='/message' method = 'POST'><input type='text' name='message'><button type='submit'>SEND</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url == "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(body);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {});
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Wello From My Node.js Server</h1></body>");
  res.write("</html>");
  res.end();
};

//export ways
//module.exports = requestHandler;

module.exports = {
    handler: requestHandler,
    someText: 'Some Text'
}
