import axios from 'axios';
async function api(sql) {
    let data;
    await axios({
        method: "post",
        url: '/api',
        data: {
            sql: sql
        }
    }).then(res => {
        data = res.data;
    })
    return data
}
export default api;