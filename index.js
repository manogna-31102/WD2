const http = require("http");
const fs = require("fs");

var port = require("minimist")(process.argv.slice(2), {
  default: {
    greeting: "Hello",
  },
});

let homepage = "";
let proj = "";
let register = "";
// fs.readFile("home.html",(err, home) => {
// console.log(home.toString());
// });
fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homepage = home;
  // http
  // .createServer((request,response)=>{
  //     response.writeHeader(200, {"Content-Type":"text/html" });
  //     response.write(home);
  //     response.end();
  // })
  // .listen(3000);
});
fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  proj = project;
});
fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  register = registration;
});
http
  .createServer((req, res) => {
    let url = req.url;
    res.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        res.write(proj);
        res.end();
        break;
      case "/registration":
        res.write(register);
        res.end();
        break;
      default:
        res.write(homepage);
        res.end();
        break;
    }
  })
  .listen(port);
