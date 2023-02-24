import { GetServerSideProps } from "next";

const Notification = () => {
  return <></>;
};
export const getServerSideProps: GetServerSideProps = async context => {
  return {
    redirect: {
      destination: "/notification/notice",
      permanent: true,
    },
  };
};
export default Notification;
