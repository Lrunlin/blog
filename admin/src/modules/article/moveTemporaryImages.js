import axios from 'axios';
async function moveTemporaryImages(getData) {
    let data;
    await axios({
        method: "POST",
        url: `${getData.api}/moveTemporaryImages`,
        data: {
            images: getData.images
        }
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default moveTemporaryImages;