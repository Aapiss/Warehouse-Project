import React from "react";
import { DNA } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}
