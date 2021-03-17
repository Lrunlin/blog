import axios from 'axios';

async function lognIn(getData) {
    let data;
    await axios({
        method: "POST",
        url: '/logn-in',
        data: {
            admin: getData.admin,
            password: getData.password
        },
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default lognIn;