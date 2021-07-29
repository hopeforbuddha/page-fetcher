const request = require("request");
const fs = require("fs");
const website = process.argv.slice(2)[0];
const fileName = process.argv.slice(2)[1];

request(website, (error, response, body) => {
  if (response.statusCode === 404) {
    console.log(`Website Not Found`);
  }
  if (body) {
    fs.writeFileSync(fileName, body, (error) => {
      if (error) {
        console.error(error);
        return;
      }
      const size = fs.statSync(fileName).size;
      console.log(`Downloaded and save ${size} bytes to ${fileName}`);
    });
    if (fs.existsSync(fileName)) {
      console.log(`File Exists`);
    }
  }
});