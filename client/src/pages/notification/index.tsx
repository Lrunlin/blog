import { GetServerSideProps } from "next";

const Notification = () => {
  return <></>;
};
export const getServerSideProps: GetServerSideProps = async context => {
  return {
    redirect: {
      destination: "/notification/comment",
      permanent: true,
    },
  };
};
export default Notification;
