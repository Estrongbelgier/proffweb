import React from "react";
import ReactLoading, { LoadingType } from "react-loading";

interface LoadProps {
  typeOf: LoadingType;
  color: string;
  w: string;
  h: string;
}

const Loading: React.FC<LoadProps> = ({ typeOf, color, w, h }) => {
  return <ReactLoading type={typeOf} color={color} width={w} height={h} />;
};

export default Loading;
