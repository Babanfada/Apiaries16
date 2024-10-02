import React from "react";
import { LineWave } from "react-loader-spinner";
import { Oval } from "react-loader-spinner";
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
export const Loader2 = () => {
  return (
    <LineWave
      visible={true}
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="line-wave-loading"
      wrapperStyle={{}}
      wrapperClass=""
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />
  );
};

export default Loader;
