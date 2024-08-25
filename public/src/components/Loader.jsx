import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <TailSpin
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
    //   wrapperStyle={{ display: flex, alignItems: center }}
      wrapperClass=""
    />
  );
};
export const Loader1 = () => {
  return (
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
