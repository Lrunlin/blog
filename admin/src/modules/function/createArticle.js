import {
    ElMessage
} from "element-plus";
import {
    Base64
} from "js-base64";

import createHtml from "@/modules/function/createHtml"; //处理HTML

import createArticle from "@/modules/article/create-article";
import moveTemporaryImages from "@/modules/article/moveTemporaryImages";

async function createArticleFun(data) {
    let images = createHtml({
        html: data.html,
        type: data.type,
        path: data.path
    });
    let state;
    await createArticle({
        router: data.router,
        type: data.type,
        introduce: data.introduce,
        article: Base64.encode(document.getElementById("changeHtml").innerHTML),
        title:data.title,
        isTop: data.isTop,
        isShow: data.isShow,
    }).then((res) => {
        if (res.res) {
            ElMessage.success({
                message: `添加成功`,
                type: "success",
            });
            // 是否需要请求替换图片文件夹（HTML内是否有图片）
            if (images.length) {
                moveTemporaryImages({
                    api: data.assetsApi,
                    images: images,
                }).then((res) => {});
            }
            state = true;
        } else {
            ElMessage.error({
                message: `添加失败`,
                type: "error",
            });
        }
    });
    return state;
}
export default createArticleFun;