import * as ts from "typescript";
import fs from "fs";

/** 编译单个TS文件为JS和map*/
function compile(path: string) {
  let content = fs.readFileSync(path).toString();
  const { outputText } = ts.transpileModule(content, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: 2,
      moduleResolution: 2,
      esModuleInterop: true,
      strict: true,
      removeComments:true,
    },
  });
  return outputText;
}

export default compile;
