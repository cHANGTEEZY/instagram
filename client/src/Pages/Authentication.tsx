import Login from "@/components/Login";
import Signup from "@/components/Signup";

const Authentication = () => {
  const token = localStorage.getItem("token");

  return <div>{token ? <Login /> : <Signup />}</div>;
};

export default Authentication;
