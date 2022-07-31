import type { NextPage,GetServerSideProps } from "next";
import Base from "@/layout/Base";



const Home: NextPage = () => {
  return (
    <Base>
      <div className="sm:mt-20 mt-2">margin-left:8</div>
    </Base>
  );
};



export const getServerSideProps:GetServerSideProps=async()=>{
  return {
    props:{}
  }
};
export default Home;
