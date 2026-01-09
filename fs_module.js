const fs = require("fs");

// Synchronous --> Blocking
console.log(` ************ Synchronous --> Blocking ************`);

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is output string.\n${textIn}\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File Written!");

// Asynchronous --> Non-Blocking
fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
  console.log(`************ Asynchronous --> Non-Blocking ************ `);
  console.log("Async : ", data);
});

// Callback Hell
console.log(`************ Callback Hell ************ `);
fs.readFile("./txt/start.txt", "utf-8", (err1, data1) => {
  //  console.log("Async - start : ", data1);
  fs.readFile("./txt/append.txt", "utf-8", (err2, data2) => {
    // console.log("Async - append : ", data2);
    fs.readFile("./txt/final.txt", "utf-8", (err3, data3) => {
      // console.log("Async - append : ", data2);
      if (err3) throw err3;
      else console.log("callbak hell : : ", data1, data2, data3);
    });
  });
});
