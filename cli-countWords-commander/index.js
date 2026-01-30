// helps to read and write the file
const fs = require("fs");
// import command class from commader lib

const { Command } = require("commander");

//create program instance
//this will create a new cli program
//this is the brain fo cli

const program = new Command();

//set cli name
//defines the name of cli tool
program
  .name("word-counter")

  //adding description
  //shows when the user runs  word-counter --help
  .description("CLI tool to count words in a file ")

  //set version
  .version("1.0.0");

//define arguments
//cli expects a file path <file>=required argument
// ex index.js text.txt

program
  .argument("<file>", "file path to read")
  //add this before action for option availability
  .option("-l,--lines", "count number of lines")
  .option("-c,--chars", "count number of characters")

  .action((file, options) => {
    try {
      const data = fs.readFileSync(file, "utf8");
      if (options.lines) {
        const lineCount = data.split("\n").length;
        console.log(`you have ${lineCount} lines in this file `);
        return;
      }
      if (options.chars) {
        const charCount = data.length;
        console.log(`you have ${charCount}characters in this file`);
        return;
      }
      const words = data.trim().split(/\s+/);
      const wordsCount = data.trim() === "" ? 0 : words.length;
      console.log(`You have ${wordsCount} words in this file `);
    } catch (err) {
      console.log("Error reading file ", err.message);
    }
  });
//starts the cli
//reads user input and executes commands
//without this cli wont run
program.parse();
/* fs.readFileSync ()
blocks the program untile file reading is complete 
so better to go with async

1.import fs.promise 
const fs = require("fs").promises;
2.make action async 
.action(async(file)=>{
3.use await 
const data=await fs.readFile(file,"utf8")
    })
*/

/* you can also add option 
run 

node index.js file.txt
node index.js file.txt -l or --lines 
node index.js file.txt -c or --chars*/
