import React from "react";
import Image from "next/image";

const AuthSidebar = () => {
  return (
    <div className="w-full bg-main-blue h-screen relative">
      <div className="absolute bottom-0 left-2 right-2">
        <h2 className="absolute font-bold text-white text-5xl left-4 leading-normal">
          Think
          <br />
          Save
        </h2>
        <Image
          src="/think-save.png"
          alt="Think Save"
          width={200}
          height={200}
          className="w-full m-0 h-full"
        />
      </div>
    </div>
  );
};

export default AuthSidebar;
