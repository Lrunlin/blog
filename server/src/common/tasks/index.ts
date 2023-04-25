import fs from "fs";
let dir = fs.readdirSync(__dirname).filter(item => {
  let filename = __filename.replace(__dirname, "").substring(1);
  return item != filename && item.endsWith(".js");
});
function start() {
  dir.forEach(item => {
    import(`./${item}`).then(res => {
      res.default();
    });
  });
}
export default start;
