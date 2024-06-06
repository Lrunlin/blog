import fs from "fs/promises";

async function copyDir(src: string, dist: string): Promise<void> {
  // 复制目录
  return await fs.cp(src, dist, { recursive: true });
}

export default copyDir;
