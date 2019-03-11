const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const mimeTypes = {
  html: "text/html",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  png: "image/png",
  js: "text/javascript",
  css: "text/css"
};

http
  .createServer((req, res) => {
    let uri = url.parse(req.url).pathname;
    let filename = path.join(process.cwd(), unescape(uri));
    console.log("Loading", uri);
    let stats;

    try {
      stats = fs.lstatSync(filename);
    } catch (err) {
      res.writeHead(404, { "Content-type": "text/plain" });
      res.write("404 not found \n");
      res.end();
      return;
    }

    if (stats.isFile()) {
      let mimeType =
        mimeTypes[
          path
            .extname(filename)
            .split(".")
            .reverse()[0]
        ];
      res.writeHead(200, { "Content-type": mimeType });

      let fileStream = fs.createReadStream(filename);
      fileStream.pipe(res);
    } else if (stats.isDirectory()) {
      res.writeHead(302, {
        Location: "index.html"
      });

      res.end();
    } else {
      res.writeHead(500, { "Content-type": "text/plain" });
      res.write("500 Internal Error\n");
      res.end();
    }
  })
  .listen(1337);
