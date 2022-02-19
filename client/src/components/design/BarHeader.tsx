import { FunctionComponent } from "react";

interface barHeaderTypes {
  id: string;
  titleEn: string;
  title: string;
  text?: string[];
}

const BarHeader: FunctionComponent<barHeaderTypes> = props => {
  let _text = props.text || [
    "热衷于新技术的学习和探讨，热衷页面布局。崇尚化繁为简理念",
    "对互联网发展趋势高兴趣关注，积极配合开发同事完成工作",
  ];
  return (
    <>
      <style jsx>{`
        .title_en {
          text-align: center;
          font-size: 48px;
          line-height: 90px;
          margin-top: 40px;
          font-weight: 500;
          color: #353535;
          letter-spacing: 5px;
          text-transform: Uppercase;
        }
        .title {
          text-align: center;
          font-size: 24px;
          line-height: 40px;
          font-weight: 100;
          color: #424242;
          letter-spacing: 5px;
        }
        .line {
          height: 2px;
          border: none;
          width: 45px;
          background: #424242;
          display: block;
          margin: 40px auto 45px;
        }
        .text {
          color: #242424;
          font-weight: lighter;
          font-size: 14px;
          letter-spacing: 3px;
          line-height: 24px;
          text-align: center;
          margin: 0px;
        }
      `}</style>
      <h2 id={props.id} className="title_en">
        {props.titleEn}
      </h2>
      <h4 className="title">{props.title}</h4>
      <hr className="line" />
      {_text.map(item => (
        <p className="text" key={props.id + item}>
          {item}
        </p>
      ))}
    </>
  );
};
export default BarHeader;
