/**
 * 用于文章大屏页面，传入px转为当前设备下对应的值
 * @params px {number} 1920屏幕下的像素值
 * @params min {number|undefined} 最小值
 * @params max {number|undefined} 最大值
 * @returns px {number} 当前设备下的像素值
 */
function vw(px: number, min?: number, max?: number) {
  // 需要注意是否服务器环境
  let _px =
    (px / 1920) * (typeof window == "undefined" ? 1200 : document.documentElement.clientWidth);
  if (min) {
    return Math.max(_px, min);
  }
  if (max) {
    return Math.min(_px, max);
  }
  return _px;
}
export default vw;
