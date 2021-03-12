import axios from 'axios';

async function deleteType(getData) {
    let data;
    await axios({
        method: "POST",
        url: '/delete-type',
        data: {
            type: getData.type
        },
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default deleteType;