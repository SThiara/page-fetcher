const request = require('request');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs');
const URL = process.argv[2];
const toWrite = process.argv[3];


if (fs.existsSync(toWrite)) {
  rl.question("File already exists, enter Y to overwrite or any key to abort ", (answer) => {
    if (answer === "Y" || answer === "y") {
      request(URL, (error, response, body) => {
        if ((error || response.statusCode !== 200)) {
          return console.log(error);
        }
        fs.writeFile(toWrite, body, (err) => {
          if (err) console.log(err);
          let fileSize = fs.statSync(toWrite);
          console.log(`Downloaded and saved ${fileSize.size} bytes to ${toWrite}`);
        });
      });
    }
    rl.close();
  })
} else {
  request(URL, (error, response, body) => {
    if ((error || response.statusCode !== 200)) {
      return console.log(error);
    }
    fs.writeFile(toWrite, body, (err) => {
      if (err) console.log(err);
      let fileSize = fs.statSync(toWrite);
      console.log(`Downloaded and saved ${fileSize.size} bytes to ${toWrite}`);
    });
  });
  rl.close();
};
