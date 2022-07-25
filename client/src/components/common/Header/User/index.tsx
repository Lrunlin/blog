import dynamic from "next/dynamic";
const LognIn = dynamic(import("./LogIn"), { ssr: false });

const User = () => {
  return (
    <>
      <LognIn/>
    </>
  );
};
export default User;
