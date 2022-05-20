import { useState, memo, useEffect } from "react";
import css from "styled-jsx/css";
import { GithubOutlined } from "@ant-design/icons";
import { getGithubProjectData } from "@/request";
import type { githubProjectTypes } from "@/types";
import Image from "next/image";
import Skeleton from "./Skeleton";
import Links from "./Links";
import If from "@/utils/If";
import NoSSR from "@/utils/NoSSR";
const Style = css`
  @mixin border {
    border-bottom: 1px solid #f2f2f2;
  }

  aside {
    width: 280px;
    @include border;
  }
  aside a {
    color: rgba(0, 0, 0, 0.85);
  }
  .aside-title {
    padding-top: 10px;
    padding-bottom: 10px;
    @include border;
    font-weight: bold;
    font-size: 15px;
    span {
      margin-left: 10px;
    }
  }
  .aside-item {
    width: 100%;
    height: 35px;
    line-height: 35px;
    @include border;
    display: block;
  }
  .aside-body {
    width: 280px;
    padding: 0px 24px;
    background-color: white;
  }
  .aside-body_data {
    position: sticky;
    top: 70px;
    z-index: 1;
    margin-top: 10px;
    padding: 10px 24px;
    .aside-body_data_link {
      padding-bottom: 10px;
      @include border;
    }
  }
  .aside-body_data_friend {
    h3 {
      font-size: 15px;
      font-weight: bold;
    }
    p {
      color: #333;
      font-size: 12px;
    }
  }
`;

/** 右侧aside*/
const Action = () => {
  const [githubData, setGithubData] = useState<githubProjectTypes[]>([]);
  useEffect(() => {
    getGithubProjectData().then(res => {
      setGithubData(res);
    });
  }, []);
  return (
    <>
      <style jsx>{Style}</style>
      <aside>
        <div className="aside-body aside-body_github">
          <h3 className="aside-title">
            <NoSSR children={<GithubOutlined />} />
            <span>我的GitHub</span>
          </h3>
          <If if={githubData.length} else={<Skeleton />}>
            {githubData.map(item => (
              <a
                href={item.url}
                key={item.id}
                target="_blank"
                rel="nofollow"
                className="aside-item"
              >
                {item.name}
              </a>
            ))}
          </If>

          <a href="https://github.com/Lrunlin" target="_blank" rel="nofollow">
            <Image
              src="/image/github.png"
              width={230}
              height={115}
              alt="作者GitHub"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAABzCAYAAACMwX5LAAAA/UlEQVR42u3TQQkAQAgAsLPMgS/7p9MagluHxc/qB6wSYoKYgJggJiAmiAmICWKKCWICYoKYgJggJiAmiAmICYgJYgJigpiAmCAmICYgJogJiAliAmKCmICYgJggJiAmiAmICWICYgJigpiAmCAmICaICYgJiAliAmKCmICYICYgJiAmiAmICWICYoKYgJiAmCAmICaICYgJYgJiAmKCmICYICYgJogJiAmICWICYoKYgJggJiAmICaICYgJYgJigpiAmCCmmCAmICaICYgJYgJigphigpiAmCAmICaICYgJYgJiAmKCmICYICYgJogJiAmICWICYoKYgJhw0gClBqubRsYlygAAAABJRU5ErkJggg=="
            />
          </a>
        </div>
        <div className="aside-body aside-body_data">
          <div className="aside-body_data_link">
            <a
              href="https://beian.miit.gov.cn/#/Integrated/index"
              target="_blank"
              rel="noopener noreferrer"
            >
              辽ICP备2020014377号-2
            </a>
            <div>Copyright © 2021- 刘润霖</div>
          </div>
          <div className="aside-body_data_friend">
            <h3>友情链接</h3>
            <p> 交换友情链接请在【随便说说】模块中留言</p>
          </div>
          <Links />
        </div>
      </aside>
    </>
  );
};

export default memo(Action);
