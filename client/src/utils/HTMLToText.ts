/**
 * todo 将HTML转为text字符串
 * @params html {string} 需要被转换的HTML
 * @return text {string} 转好好的text
 */
const HTMLToText = (html: string): string => {
  let container = document.createElement("div");
  container.innerHTML = html;
  
  return container.innerText.trim();
};
export default HTMLToText;