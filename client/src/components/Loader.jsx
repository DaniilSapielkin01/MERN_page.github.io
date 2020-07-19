import React from "react";

export const Loader = () => {
  return (
    <div
      className=""
      style={{ display: "flex", justifyContent: "center", padding: "3rem" }}
    >
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    </div>
  );
};
