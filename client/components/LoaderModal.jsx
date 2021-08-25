import React, { useState } from 'react';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/BarLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

const LoaderModal = () => {

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#36D7B7");

  return (
    <div className="sweet-loading loaderModal">
      <ClipLoader color={color} loading={loading} css={override} height={4} width={200}/>
    </div>
  )
}

export default LoaderModal;