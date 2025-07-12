import * as http from "http";
import path from 'path'
import fs, { promises as fsPromises } from "fs";
import {  ProductList } from "./types/product"
const server = http.createServer((req, res) => {
  const productFilePath = path.join(__dirname, "data", "product.json")
  const assetsPath = path.join(__dirname, 'assets')
  console.log(assetsPath)
  if (req.url === "/product") {
    fs.access(productFilePath, (err) => {
      if (err) {
        console.error("the file does not accessible for me ", productFilePath);
        return;
      }
      fs.readFile(productFilePath, "utf8", (error, data) => {
        const jsonProducts: ProductList = JSON.parse(data);

        res.writeHead(200, { "Content-Type": "application/json" });
        console.log("Data is ==>", jsonProducts);
        res.end(data);
        // Log to terminal as pretty JSON

      })
    })
  } else if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>welcome home</h1>");
    res.end();
  } else if (req.method === "POST" && req.url === "/add-product") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const data = new URLSearchParams(body);
      res.writeHead(200, { "Content-Type": "text/html" });
      let title = data.get("title");
      let description = data.get("description");

      try {
        const jsonData = await fsPromises.readFile(productFilePath, "utf8")
        const jsonProducts: ProductList = JSON.parse(jsonData)
        jsonProducts.products.push({ id: jsonProducts.products.length + 1, title: title as string, description: description as string });
        const updatedData = JSON.stringify(jsonProducts, null, 4)
        await fsPromises.writeFile(productFilePath, updatedData)
      } catch (error) {
        console.log(error)
      }
      //** write form file  */

      res.write(`<div>
                <h2>title is: ${title}</h2>
                <h2>description is${description}</h2>
                </div>`);
      res.end("<h1>product has been added</h1>");
    });
  } else if (req.url === "/product/new") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Add New Product</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          form {
            background: white;
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          input
           {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
            textarea{
             width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            }
          button {
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background-color: #2980b9;
          }
        </style>
      </head>
      <body>
        <form action="/add-product" method="POST">
          <h2>Add New Product</h2>
          <input type="text" name="title" placeholder="Product Title" required />
          <textarea  name="description" placeholder="Product Description" required ></textarea><br><br>
          <button type="submit">Save Product</button>
        </form>
      </body>
      </html>
    `);
    res.end();
  } else if (req.method === 'GET' && req.url === "/assets") {
    fs.access(assetsPath, err => {
      if (err) {
        console.error('This file not exist in this path ', assetsPath)
        return;
      }
      fs.readdir(assetsPath, (err, files) => {
        if (err) {
          console.error('Error reading directory', err)
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html" })
        res.write("<h1>Here are your assets</h1>");
        res.write("<ul>")
        files.forEach(file => {
          res.write(`<li><a href="/delete?file=${encodeURIComponent(file)}">${file}</a></li>`)
        })
        res.write("</ul>")
        res.end();
      })
    })
  } else if (req.method === 'GET' && req.url?.startsWith('/delete')) {
    const file = decodeURIComponent(req.url.split('?')[1].split('=')[1])
    const assetsPath = path.join(__dirname, 'assets', file)
    fs.access(assetsPath, (err) => {

      if (err) {
        console.log("❌ File not found, can't delete");
        return;
      }
      fs.unlink(assetsPath, err => {
        if (err) {
          console.error(err);
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<div>
          <h1> file ${file} has been deleted !</h1>
          </div>`)
        res.end();
      })
    }
    )
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404 Not Found');

  }
})
const PORT = 5000;
server.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
