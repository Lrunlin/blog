import { useState, useEffect, useMemo, Fragment, memo } from "react";
import { withRouter } from "next/router";
import { Button, Input, message, Comment, Tooltip, Avatar } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

interface commentTypes {
  id: string;
  token: string;
  face: string;
  content: string;
  name: string;
  time: string;
}

const { TextArea } = Input;
function squareMessage(props) {
  const [isLognIn, LognIn] = useState<boolean>(false); //是否登录
  const [text, setText] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false); //加载中

  //是否对按钮上锁
  let isLock = useMemo<boolean>(() => {
    let test = /^[\s\S]*.*[^\s][\s\S]*$/;
    return isLoad || !test.test(text) || text.length > 200;
  }, [text, isLoad]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("/user", {
          params: { verify_only: true },
          headers: { token: localStorage.getItem("token") },
        })
        .then(res => {
          if (res.data.success) {
            LognIn(res.data.success);
          }
        });
    }

    //有code就是302来的请求一下然后关闭窗口
    let code = props.router.query?.code;
    if (code) {
      message.info("登录中，请等待");
      axios
        .get("/user/sign", { params: { code: code } })
        .then(res => {
          message.success("登录成功");
          localStorage.setItem("token", res.data.data);
        })
        .catch(err => {
          message.info("登录失败");
        })
        .finally(() => {
          window.close();
          window.opener.location.reload();
        });
    }
  }, []);

  const [commentData, setCommentData] = useState<commentTypes[]>([]);
  const [isCommentLoad, setIsCommentLoad] = useState<boolean | string>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setIsCommentLoad(true);
    axios.get(`/comment/page/${page}`).then(res => {
      setCommentData(data => data.concat(res.data.data));
      if (res.data.data.length < 10) {
        setIsCommentLoad("没有更多了");
      } else {
        setIsCommentLoad(false);
      }
    });
  }, [page]);

  function windowOpen() {
    window.open(
      "https://github.com/login/oauth/authorize?client_id=fa17b3676791f6cfa668",
      "_parent ",
      "width=500;height=400"
    );
  }

  function comment() {
    setIsLoad(true);
    axios
      .post(
        "/comment",
        { content: text },
        { headers: { token: localStorage.getItem("token") + "" } }
      )
      .then(res => {
        message[res.data.success ? "success" : "error"](res.data.message);
      })
      .catch(err => {
        message.error("请求错误");
      })
      .finally(() => {
        setText("");
        setIsLoad(false);
      });
  }

  return (
    <>
      {commentData.map((item: commentTypes) => {
        return (
          <Comment
            key={item.id}
            author={<a target="_blank" href={`https://github.com/${item.name}`}>{item.name}</a>}
            avatar={<Avatar src={item.face} alt="用户头像" />}
            content={<p>{item.content}</p>}
            datetime={<span>{item.time}</span>}
          />
        );
      })}
      <p style={{ textAlign: "center" }}>
        {typeof isCommentLoad == "string" ? (
          <span>没有更多了</span>
        ) : isCommentLoad ? (
          <span>
            <LoadingOutlined />
            加载中
          </span>
        ) : (
          <span onClick={() => setPage(p => p + 1)}>加载更多</span>
        )}
      </p>

      {!isLognIn ? (
        <div>
          <p>登录后才可以评论</p>
          <Button type="primary" onClick={windowOpen}>
            使用GItHub
          </Button>
        </div>
      ) : (
        <div>
          <TextArea
            rows={4}
            onChange={(e: any) => setText(e.target.value)}
            value={text}
            placeholder="输入您的评论(最长200字)"
          />
          <Button
            disabled={isLock}
            loading={isLoad}
            type="primary"
            style={{ marginTop: "20px" }}
            onClick={comment}
          >
            发布评论
          </Button>
        </div>
      )}
    </>
  );
}
export default withRouter(
  memo(squareMessage, function (props) {
    return false;
  })
);
