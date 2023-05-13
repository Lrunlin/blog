import { vw, $color } from "@/pages/admin/statistics/style";
import css from "styled-jsx/css";

export default css`
  /* header中的item容器 */
  .header-item {
    width: ${vw(278)};
    height: ${vw(96)};
    .title {
      font-size: ${vw(24)};
      font-weight: 700;
      color: white;
    }
    .data {
      color: ${$color};
      font-weight: 700;
      font-size: ${vw(24)};
    }
    .footer {
      font-size: ${vw(16)};
      color: white;
    }
  }
`;
