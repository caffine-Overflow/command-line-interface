//read file
const fs = require("fs");
//get file path from command line
const filePath = process.argv[2];

//check if the user gave file path
if (!filePath) {
  console.log("please provide a file path");
  process.exit(1);
}
//read the file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file :", err.message);
    return;
  }

  //count words
  const words = data.trim().split(/\s+/);
  const wordCount = data.trim() === "" ? 0 : words.length;
  // trim()removes extra spaces
  //spilt(/\s+/)-spilts by spaces ,tabs,newLines

  //show result
  console.log(`you have ${wordCount} words in this file `);
});
