import React from "react";
import logo from "@/public/logo.png";
import Image from "next/image";

const VSTechLogo = () => {
  return (
    <div className="bg-black p-2">
      <Image className="" src={logo} alt="logo" width={165.75} height={62.25} />
    </div>
  );
};

export default VSTechLogo;
