"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const server = http.createServer((req, res) => {
    if (req.url === "/product") {
        fs_1.default.readFile(path_1.default.join(__dirname, "data", "product.json"), "utf8", (error, data) => {
            console.log(__dirname);
            console.log(__filename);
            if (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                console.error("Error is ==>" + error);
                res.end(JSON.stringify({ error: "Error fetching data" }));
                return;
            }
            // Log to terminal as pretty JSON
            res.writeHead(200, { "Content-Type": "application/json" });
            const parsedData = JSON.parse(data);
            console.log("Data is ==>", parsedData);
            // console.log('he');
            res.end(data);
        });
    }
    else if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>welcome home</h1>");
        res.end();
    }
    else if (req.method === "POST" && req.url === "/add-product") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const data = new URLSearchParams(body);
            res.writeHead(200, { "Content-Type": "text/html" });
            let title = data.get("title");
            let description = data.get("description");
            res.write(`<div>
                <h2>title is: ${title}</h2>
                <h2>description is${description}</h2>
                </div>`);
            res.end("<h1>product has been added</h1>");
        });
    }
    else if (req.url === "/product/new") {
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
    }
});
const PORT = 5000;
server.listen(PORT, () => {
    console.log("Server is running on port 5000");
});
