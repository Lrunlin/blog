const moment = require('moment');
const fs = require('fs');

function getIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

const createLog = async function (req, res, next) {
    next()

    let filePath = `public/log/${moment().format('yyyy-MM-DD')}.json`;
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '{"data":[]}'); // todo 写入时先判断有误对应的文件夹
    setTimeout(() => {
        let log = {
            id: +new Date() + ((Math.random() + '').toString(32)),
            ip: getIp(req),
            path: req.path,
            method: req.method,
            responseTime: req.time,
            time: moment().format('yyyy-MM-DD HH:mm:ss'),
        }
        let logData = JSON.parse(fs.readFileSync(filePath).toString());
        logData.data.unshift(log)
        fs.writeFileSync(filePath, JSON.stringify(logData));
    }, 0);

}
module.exports = createLog;