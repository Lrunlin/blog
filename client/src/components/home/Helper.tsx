import Image from "next/image";
import { FunctionComponent } from "react";
interface helperTypes {
  icon: string;
  text: string;
  color: string;
}

interface helperIconTypes {
  icon: string;
  title: string;
  text: string;
  color: string;
}

const HelperItem: FunctionComponent<helperTypes> = (props)=> {
  return (
    <div className="helper-item_container">
      <style jsx>
        {`
          .helper-item_container {
            background-color: ${props.color};
            width: calc(100vw / 3);
            height: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          p {
            font-weight: 900;
            color: white;
            font-size: 26px;
          }
          .helper-line {
            height: 2px;
            width: 45px;
            background: white;
            display: block;
          }
        `}
      </style>
      <Image width={120} height={120} src={`/image/${props.icon}`}></Image>
      <p>{props.text}</p>
      <div className="helper-line"></div>
    </div>
  );
};
const HelperIcon: FunctionComponent<helperIconTypes> = props => {
  return (
    <>
      <style jsx>{`
        .container {
          width: 20%;
          text-align: center;
        }
        .helper-icon_image {
          width: 64px;
          height: 64px;
          margin: 0px auto;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          border-radius: 50%;
        }
        .container:hover {
          .helper-icon_image {
            background-color: ${props.color};
          }
        }
        .helper-icon_title {
          font-size: 16px;
          color: #666;
          font-weight: 600;
        }
        .helper-icon_text {
          box-sizing: border-box;
          color: #777;
          font-weight: 300;
          font-size: 14px;
          letter-spacing: 1px;
        }
      `}</style>
      <div className="container">
        <div className="helper-icon_image">
          <Image src={`/image/${props.icon}`} width={45} height={45} alt="展示ICON" />
        </div>
        <h2 className="helper-icon_title">{props.title}</h2>
        <div className="helper-icon_text">{props.text}</div>
      </div>
    </>
  );
};
const Helper:FunctionComponent = () => {
  let helperList: helperTypes[] = [
    {
      icon: "定制化.png",
      text: "定制化开发",
      color: "#3edbd9",
    },
    {
      icon: "响应式.png",
      text: "H5响应式布局",
      color: "#3a98fe",
    },
    {
      icon: "SEO.png",
      text: "良好的SEO",
      color: "#5841b8",
    },
  ];
  let helperIconList: helperIconTypes[] = [
    {
      icon: "官网访问.png",
      title: "官网建设",
      text: "展示企业形象，宣传产品与服务",
      color: "#e96656",
    },
    {
      icon: "后台管理.png",
      title: "后台系统",
      text: "实时统计您想要的数据",
      color: "#34d293",
    },
    {
      icon: "小程序.png",
      title: "小程序",
      text: "开发移动端市场客户，便捷地获取和传播",
      color: "#3ab0e2",
    },
    {
      icon: "作业.png",
      title: "毕业设计",
      text: "根据需求制作WEB方向毕业设计程序、论文",
      color: "#5841b8",
    },
  ];
  return (
    <>
      <style jsx>{`
        .helper-header {
          background-color: #333333;
          height: 215px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 40px;
        }
        .hepler-header_title {
          font-weight: bold;
          font-size: 25px;
          color: white;
        }
        .helper-container {
          display: flex;
        }
        .helper-container_icon {
          width: 1000px;
          margin: 60px auto;
          display: flex;
        }
      `}</style>
      <div className="helper-header">
        <p className="hepler-header_title">想做个网站？</p>
      </div>
      <div className="helper-container">
        {helperList.map(item => (
          <HelperItem key={item.icon} {...item} />
        ))}
      </div>
      <div className="helper-container_icon">
        {helperIconList.map(item => (
          <HelperIcon {...item} key={item.text} />
        ))}
      </div>
    </>
  );
};
export default Helper;
