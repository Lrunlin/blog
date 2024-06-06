const fs = require("fs");
const path = require("path");

// Helper function to copy a directory recursively
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper function to move a directory recursively
function moveDirectory(src, dest) {
  fs.renameSync(src, dest);
}

// Define the source and destination paths
const publicSrc = path.resolve(__dirname, "../../public");
const publicDest = path.resolve(__dirname, "../../.next/standalone/public");
const staticSrc = path.resolve(__dirname, "../../.next/static");
const staticDest = path.resolve(__dirname, "../../.next/standalone/.next/static");

// Copy public directory
console.log(`复制 ${publicSrc} 到 ${publicDest}...`);
copyDirectory(publicSrc, publicDest);
console.log("Public复制结束");

// 复制nodemon
fs.copyFileSync(
  path.resolve(__dirname, "./nodemon.json"),
  path.resolve(__dirname, "../../.next/standalone/nodemon.json")
);

// Move static directory
console.log(`移动 ${staticSrc} 到 ${staticDest}...`);
moveDirectory(staticSrc, staticDest);
console.log("Static 移动结束");

// 文件夹重命名
moveDirectory(
  path.resolve(__dirname, "../../.next/standalone"),
  path.resolve(__dirname, "../../.next/blog_client")
);
console.log("文件夹重命名完成");
