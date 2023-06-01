import wangEditor from "wangeditor";
const E = wangEditor;

const { BtnMenu } = E;
class MyButtonMenu extends BtnMenu {
  setState: () => void;
  constructor(editor: wangEditor, setState: () => void) {
    const $elem = E.$(
      `<div class="w-e-menu" data-title="使用MarkDown编辑器">
                       <svg t="1685596470235" class="icon" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2393" width="14" height="14"><path d="M1187.6 118.2H92.4C41.4 118.2 0 159.6 0 210.4v603c0 51 41.4 92.4 92.4 92.4h1095.4c51 0 92.4-41.4 92.2-92.2V210.4c0-50.8-41.4-92.2-92.4-92.2zM677 721.2H554v-240l-123 153.8-123-153.8v240H184.6V302.8h123l123 153.8 123-153.8h123v418.4z m270.6 6.2L763 512H886V302.8h123V512H1132z" p-id="2394" fill="#999999"></path></svg>
       </div>`
    );
    super($elem, editor);
    this.setState = setState;
  }
  tryChangeActive() {
    this.active();
  }
  clickHandler() {
    this.setState();
  }
}
export default MyButtonMenu;
