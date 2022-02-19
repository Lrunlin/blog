import WangEditor from 'wangeditor';
/** 
 * todo 用于配置API修改页面的富文本编辑器
 * @params id {string} 挂载DOM的id
 * @params setOPtion {(e)=>void} 配置信息（为了在编辑器创建之前就配置）
 * @return editor 创建好的编辑器
 */
function option(id, setOPtion,LineFeed) {
    const editor = new WangEditor(`#${id}`);
    editor.config.menus = [
        "head",
        "bold",
        "fontSize",
        "fontName",
        "italic",
        "underline",
        "strikeThrough",
        "indent",
        "lineHeight",
        "foreColor",
        "backColor",
        "link",
        "list",
        "todo",
        "justify",
        "quote",
        "table",
        "splitLine",
        "code"
    ];

    editor.config.languageType = [
        "json",
    ];

    editor.config.showMenuTooltips = false;//关闭触碰提示

    editor.config.height = 500; //高度500
    editor.config.onchangeTimeout = 500;
    editor.config.showFullScreen = false;

    // https://www.wangeditor.com/doc/pages/11-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%89%A9%E5%B1%95%E8%8F%9C%E5%8D%95/01-%E5%BF%AB%E9%80%9F%E6%89%A9%E5%B1%95%E4%B8%80%E4%B8%AA%E8%8F%9C%E5%8D%95.html
    const {
        $,
        BtnMenu,
    } = WangEditor;


    // 配置预览功能
    class AlertMenu extends BtnMenu {
        constructor(editor) {
            // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
            const $elem = WangEditor.$(
            `<div class="w-e-menu" data-title="最后一行" style="margin-left:10px;">
                <button class="el-button el-button--default el-button--mini is-round">最后一行</button>
            </div>`
            )
            super($elem, editor)
        }
        clickHandler() {
            //换行
            LineFeed()
        }
        tryChangeActive() {
            this.active()
        }
    }

    const menuKey = 'alertMenuKey'

    WangEditor.registerMenu(menuKey, AlertMenu)

    setOPtion && setOPtion(editor); //额外配置
    editor.create();
    return editor;
}
export default option;