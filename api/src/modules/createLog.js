const moment = require('moment');
const fs = require('fs');
async function createLog(req, res, next) {
    next();
    let startTime = new Date(); //? 进入路由时保存时间在离开时相减

    function getIp() {
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    }
    const calResponseTime = () => new Date() - startTime;

    let filePath = `public/log/${moment().format('yyyy-MM-DD')}.json`

    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '{"data":[]}'); // todo 写入时先判断有误对应的文件夹

    let result = await res.once('finish', calResponseTime);

    let log = {
        id: +new Date() + ((Math.random() + '').toString(32)),
        ip: getIp(),
        path: req.path,
        method: req.method,
        responseTime: calResponseTime(),
        time: moment().format('yyyy-MM-DD HH:mm:ss')
    }

    let logData = JSON.parse(fs.readFileSync(filePath).toString());
    logData.data.unshift(log)
    fs.writeFileSync(filePath, JSON.stringify(logData))
}
module.exports = createLog;