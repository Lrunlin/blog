require("module-alias/register"); //设置绝对路径


import express from "express";
const router = express.Router();
import fs from "fs";
import path from "path";
const app = express();

app.use("/robots.txt", express.static("public/robots.txt"));
app.use("/image", express.static("public/image"));

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
import cookieParser from "cookie-parser";
app.use(cookieParser());

import cors from "cors";
app.use(
  cors({
    origin: function (origin: any, callback: any) {
      callback(null, true);
    },
    credentials: true,
  })
);


import morgan from "morgan";
if (process.env.ENV == "dev") {
  app.use(morgan("dev"));
} 


async function fileDisplay(filePath: string) {
  let files: string[] = fs.readdirSync(filePath);
  files.forEach((filename: string) => {
    let filedir: string = path.join(filePath, filename); //拼接路径用于app.use
    let stats: fs.Stats = fs.statSync(filedir);
    let isFile: boolean = stats.isFile();
    let isDir: boolean = stats.isDirectory();
    if (isFile) {
      import(filedir).then(route => {
        app.use("/", route.default);
      });
    }
    if (isDir) {
      fileDisplay(filedir);
    }
  });
}
const filePath: string = path.join(__dirname, "./routes");
fileDisplay(filePath);



app.listen(3000, () => console.log(`run`));
