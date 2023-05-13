const $color = "rgba(14, 253, 255, 1)";
const $borderColor = "rgba(14, 253, 255, 0.5)";
const vw = ($px: number) => `calc(${$px}/1920 * 100vw)`;
const vh = ($px: number) => `calc(${$px}/961 * 100vh)`;
export { $color, $borderColor, vw, vh }; 
import css from 'styled-jsx/css'

export default css.global`
  .container-title {
    color: ${$color};
    font-size: ${vw(32)};
    text-align: center;
    font-weight: 900;
  }
  main.main {
    width: ${vw(1843)};
    margin: 0px auto;
    margin-top: ${vh(30)};
  }
`;
