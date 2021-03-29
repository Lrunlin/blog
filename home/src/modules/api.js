import axios from 'axios';
async function api(sql) {
    let data;
    await axios({
        method: sql.toLowerCase().indexOf('select') != -1 ? 'get' : 'post',
        url: '/api',
        data: {
            sql: sql
        },
        params: {
            sql: sql
        },
    }).then(res => {
        data = res.data;
    })
    return data
}
export default api;