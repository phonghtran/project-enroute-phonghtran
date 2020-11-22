import React from "react";
import { useLocation } from "react-router-dom";

function Delivery() {
  const location = useLocation();

  return (
    <div>
      <p>{new URLSearchParams(location.search).get("trackingNumber")}</p>
      <h1>TODO: pull package details</h1>
    </div>
  );
}

export default Delivery;
