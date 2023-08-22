import React from "react";

export default function Spinner() {
  return (
    <div className="min-h-[300px] w-full flex items-center justify-center">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
