const fs = require('fs');
const path = require('path');

const clearDir = require('./modules/clearDir'); //删除整个文件夹
const copyDir = require('./modules/copyDir'); //复制文件夹
const countFile = require('./modules/countFile'); //计算文件夹内文件的个数


clearDir('dist'); //清空dist
fs.mkdirSync('dist') //创建dist
copyDir('public', 'dist/public'); //复制public
let env = '';
fs.readdirSync('env/development').forEach(item => {
    env += `${fs.readFileSync(`env/development/${item}`).toString()}\n`
})
fs.writeFileSync('dist/.env', env) //复制环境变量文件


// 开始执行tsc
const shell = require('shelljs');
const tsCount = countFile(path.join(__dirname, '../src')) //获取ts文件个数实时对比JS
const _tsc = shell.exec('tsc', {
    async: true
});
// 实时对比TS和JS的个数
new Promise((resolve, reject) => {
    _tsc.stdout.on('data', function (data) {
        let src = path.join(__dirname, '../dist/src');
        if (fs.existsSync(src)) {
            let timer = setInterval(() => {
                let jsCount = countFile('./dist/src')
                if (jsCount == tsCount) {
                    clearInterval(timer)
                    resolve()
                }
            }, 50);
        }
    });
}).then(() => {
    shell.exec('cross-env ENV=development nodemon --watch ./dist ./dist/src/index.js', {
        async: true
    });
})