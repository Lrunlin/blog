import axios from 'axios';
async function deleteAssets(getData) {
    let data;
    await axios({
        method: "POST",
        url: `${getData.api}/delete-assets`,
        data: {
            images: getData.images
        }
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default deleteAssets;