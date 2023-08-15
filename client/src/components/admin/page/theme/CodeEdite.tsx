import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import { Card } from "antd";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import classNames from "classnames";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

interface propsType {
  defaultValue?: string;
  className?: string;
  onChange: (val: string) => void;
}

const CodeEdite: FC<propsType> = props => {
  const [content, setContent] = useState("");

  let html = `<div><h2>Markdown Basic Syntax</h2>\n<p>I just love <strong>bold text</strong>. Italicized text is the <em>cat's meow</em>. At the command prompt, type <code>nano</code>.</p>\n<p>My favorite markdown editor is <a href=\"https://github.com/bytedance/bytemd\">ByteMD</a>.</p>\n<ol>\n<li>First item</li>\n<li>Second item</li>\n<li>Third item</li>\n</ol>\n<blockquote>\n<p>Dorothy followed her through many of the beautiful rooms in her castle.</p>\n</blockquote>\n<pre><code class=\"language-js\">import { Editor, Viewer } from 'bytemd';\nimport gfm from '@bytemd/plugin-gfm';\n\nconst plugins = [\n  gfm(),\n  // Add more plugins here\n];\n\nconst editor = new Editor({\n  target: document.body, // DOM to render\n  props: {\n    value: '',\n    plugins,\n  },\n});\n\neditor.on('change', (e) =&gt; {\n  editor.$set({ value: e.detail.value });\n});\n</code></pre>\n<h2>GFM Extended Syntax</h2>\n<p>Automatic URL Linking: <a href=\"https://github.com/bytedance/bytemd\">https://github.com/bytedance/bytemd</a></p>\n<p><del>The world is flat.</del> We now know that the world is round.</p>\n<ul>\n<li><input type=\"checkbox\" checked=\"\" disabled=\"\"> Write the press release</li>\n<li><input type=\"checkbox\" disabled=\"\"> Update the website</li>\n<li><input type=\"checkbox\" disabled=\"\"> Contact the media</li>\n</ul>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Syntax</th><th>Description</th></tr></thead><tbody><tr><td>Header</td><td>Title</td></tr><tr><td>Paragraph</td><td>Text</td></tr></tbody></table>\n<h2>Footnotes</h2>\n<p>Here's a simple footnote,<a href=\"#user-content-fn-1\">1</a> and here's a longer one.<a href=\"#user-content-fn-bignote\">2</a></p>\n<h2>Footnotes</h2>\n<ol>\n<li>\n<p>This is the first footnote. <a href=\"#user-content-fnref-1\">↩</a></p>\n</li>\n<li>\n<p>Here's one with multiple paragraphs and code.</p>\n<p>Indent paragraphs to include them in the footnote.</p>\n<p><code>{ my code }</code></p>\n<p>Add as many paragraphs as you like. <a href=\"#user-content-fnref-bignote\">↩</a></p>\n</li>\n</ol>\n</div>`;

  const firstRender = useRef(true);
  useEffect(() => {
    if (props.defaultValue && firstRender.current) {
      setContent(props.defaultValue);
      firstRender.current = false;
    }
  }, []);

  return (
    <div className={classNames("flex h-[500px]", props.className)}>
      <CodeMirror
        value={content}
        theme={vscodeDark}
        className="w-1/2"
        height="500px"
        extensions={[css()]}
        onChange={val => {
          setContent(val);
          props.onChange(val);
        }}
      />
      <style jsx global>
        {`
          ${content}
        `}
      </style>
      <Card className="ml-2 w-1/2 overflow-y-scroll">
        <div className="content-body" dangerouslySetInnerHTML={{ __html: html }}></div>
      </Card>
    </div>
  );
};
export default CodeEdite;
