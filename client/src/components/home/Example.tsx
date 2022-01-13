import { useState, useEffect, FunctionComponent, memo } from "react";
import BarHeader from "@/components/home/BarHeader";
import { Button, Image } from "antd";
import { getGithubProjectData } from "@/request";
import { githubProjectTypes } from "@/types";

interface maskTypes {
  data: githubProjectTypes;
  setIsPreview: (value: boolean) => void;
}

const Mask: FunctionComponent<maskTypes> = props => {
  return (
    <div>
      <div>
        <Button ghost href={props.data.url} target="_blank" onClick={e => e.stopPropagation()}>
          项目查看
        </Button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button ghost onClick={() => props.setIsPreview(true)}>
          图片预览
        </Button>
      </div>
    </div>
  );
};

const Item: FunctionComponent<githubProjectTypes> = (props): JSX.Element => {
  const [isPreview, setIsPreview] = useState(false);
  return (
    <>
      <style jsx>{`
        .example-item_img_container {
          display: block;
          width: 200px;
          height: 340px;
          position: relative;
        }
      `}</style>
      <div className="example-item_img_container">
        <Image
          height={340}
          width={200}
          preview={{
            visible: isPreview,
            onVisibleChange: vis => setIsPreview(vis),
            mask: <Mask data={props} setIsPreview={value => setIsPreview(value)} />,
          }}
          src={props.image}
          alt="样例展示图"
        />
        <h3 style={{ color: "black", textAlign: "center" }}>{props.name}</h3>
      </div>
    </>
  );
};

const Example: FunctionComponent = () => {
  const [data, setData] = useState<githubProjectTypes[]>([]);
  useEffect(() => {
    getGithubProjectData().then(res => {
      setData(res);
    });
  }, []);

  return (
    <>
      <style jsx>
        {`
          .example-container {
            background-color: #f7f7f7;
            padding-bottom: 50px;
          }
          .example-item_container {
            display: flex;
            justify-content: space-evenly;
            width: 1000px;
            margin: 0px auto;
            margin-top: 30px;
          }
          .example-messgae {
            text-align: center;
            margin-top: 20px;
            font-size: 20px;
          }
          .example-messgae a {
            color: black;
            font-weight: 700;
            text-decoration: underline;
          }
        `}
      </style>
      <div className="example-container">
        <BarHeader id="example" titleEn="MY WORKS" title="精选·案例" />
        <p className="example-messgae">
          以下来源于个人
          <a href="https://github.com/Lrunlin" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
        <div className="example-item_container">
          {data.map(item => {
            return <Item {...item} key={item.id} />;
          })}
        </div>
      </div>
    </>
  );
};
export default memo(Example);
