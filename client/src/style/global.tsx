/** 全局样式*/
function Style() {
  return (
    <>
      <style jsx global>{`
        html,
        body {
          scroll-behavior: smooth; /* 锚点滚动 */
        }
        body {
          background-color: #f5f5f5;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }
        body::-webkit-scrollbar {
          display: none; /* Chrome Safari */
        }
        .container {
          width: 100vw;
          max-width: 1300px;
          margin: 0px auto;
          padding-bottom: 20px;
        }
     
      `}</style>
    </>
  );
}
export default Style;
