const http = require("http");
const url = require("url");
const fs = require("fs");

// server & Route
const PORT = 8080;

const replaceTemplate = (temp, product) => {
  let output = temp
    .replace(/{%PRODUCTNAME%}/g, product.productName)
    .replace(/{%IMAGE%}/g, product.image)
    .replace(/{%FROM%}/g, product.from)
    .replace(/{%NUTRIENTS%}/g, product.nutrients)
    .replace(/{%QUANTITY%}/g, product.quantity)
    .replace(/{%PRICE%}/g, product.price)
    .replace(/{%DESCRIPTION%}/g, product.description)
    .replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  } else {
    output = output.replace(/{%NOT_ORGANIC%}/g, "");
  }

  return output;
};
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;

  // Overview Page
  if (pathName == "/" || pathName == "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);
  }

  // Overview Page
  else if (pathName == "/product") {
    res.writeHead(200);
    res.end("This is PRODUCT");
  }

  // API
  else if (pathName == "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end("API");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "custom-header": "404-custom",
    });
    res.end(`<h1>Page not found!</h1>`);
  }

  // res.end("Hello from the server!");
});
server.listen(PORT, "127.0.0.1", () => {
  console.log(`listening to req on port ${PORT}`);
});
