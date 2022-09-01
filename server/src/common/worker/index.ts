import fs from "fs";
let dir = fs.readdirSync(__dirname).filter(item => {
  return item != __filename.replace(__dirname, "").substring(1);
});
function start() {
  dir.forEach(item => {
    import(`./${item}`).then(res => {
      res.default();
    });
  });
}
export default start;
