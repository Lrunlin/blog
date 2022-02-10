require("module-alias/register"); //设置绝对路径
/*
time:2021-10-21
author:liurl0621@gmail.com
*/

import express from "express";
const router = express.Router();
import fs from "fs";
import path from "path";
const app = express();

app.use("/robots.txt", express.static("public/robots.txt"));

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

import morgan from "morgan";
if (process.env.ENV == "dev") {
  app.use(morgan("dev"));
}

const formatSize = (fileSize: number) => {
  let result = "";
  if (fileSize >= 1048576) {
    result =
      fileSize % 1048576 === 0 ? fileSize / 1048576 + "MB" : Math.trunc(fileSize / 1048576) + "MB";
  } else if (fileSize >= 1024) {
    result = fileSize % 1024 === 0 ? fileSize / 1024 + "KB" : Math.trunc(fileSize / 1024) + "KB";
  } else {
    result = fileSize + "B";
  }
  return result;
};

app.listen(3000, () => console.log(`run`));
