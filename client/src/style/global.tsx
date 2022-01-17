/** 全局样式*/
function Style() {
  return (
    <>
      <style jsx global>{`
        body {
          background-color: #f5f5f5;
        }
        body::-webkit-scrollbar {
          transition: 0.2s;
          width: 6px;
          height: 6px;
        }
        body::-webkit-scrollbar-thumb {
          background: #777;
          border-radius: 4px;
        }
        body::-webkit-scrollbar-track {
          border-radius: 10px;
        }

        .container {
          width: 100%;
          max-width: 1300px;
          margin: 0px auto;
          padding-bottom: 20px;
        }
      `}</style>
    </>
  );
}
export default Style;
