import * as ts from "typescript";
import fs from "fs";

/** 编译单个TS文件为JS和map*/
function compile(path: string) {
  let content = fs.readFileSync(path).toString();
  const { outputText } = ts.transpileModule(content, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: 4, //4是2017,2是2015
      moduleResolution: 2,
      esModuleInterop: true,
      strict: true,
      removeComments: true,
    },
  });
  return outputText;
}

export default compile;


// const { readFileSync, writeFileSync } = require("fs");
// const { transform, transformSync } = require("@swc/core");
// const code = readFileSync("./advertisement.ts", "utf-8");
// let a = transform(code, {
//   jsc: {
//     parser: {
//       syntax: "typescript",
//       decorators: true,
//     },
//     target: "es2015",
//   },
// });
