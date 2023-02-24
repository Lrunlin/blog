import { PluginComponent } from "react-markdown-editor-lite";
import { Modal, Select } from "antd";
import type { response } from "@type/common/response";
import axios from "axios";
import { MenuUnfoldOutlined } from "@ant-design/icons";

interface CounterState {}
const { confirm } = Modal;
const { Option } = Select;
type listType = { title: string; language: string }[];
class Counter extends PluginComponent<CounterState> {
  // 这里定义插件名称，注意不能重复
  static pluginName = "counter";
  // 定义按钮被放置在哪个位置，默认为左侧，还可以放置在右侧（right）
  static align = "left";
  // 如果需要的话，可以在这里定义默认选项

  state = {
    data: [],
  };

  UNSAFE_componentWillMount() {
    axios.get<response<listType>>("/language-list").then(res => {
      this.setState({ data: res.data.data });
    });
  }

  handleClick = () => {
    confirm({
      title: "支持代码高亮的语言列表",
      maskClosable: true,
      content: (
        <Select
          style={{ width: "200px" }}
          showSearch
          placeholder="输入想要查询的语言"
          onChange={val => {
            this.editor.insertText(`\`\`\`\`${val}\n\n\`\`\`\``);
            Modal.destroyAll();
          }}
        >
          {this.state.data.map((item: any) => (
            <Option value={item.language} key={item.language + item.title}>
              <em>
                {item.title}-{item.language}
              </em>
            </Option>
          ))}
        </Select>
      ),
      onOk() {
        Modal.destroyAll();
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  };

  render() {
    return (
      <span
        className="button button-type-counter"
        title="代码块语言列表"
        onClick={this.handleClick}
      >
        <MenuUnfoldOutlined />
      </span>
    );
  }
}
export default Counter;
