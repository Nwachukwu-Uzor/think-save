import React from "react";
import { LoginForm } from "@/components/auth/";

const Login = () => {
  return (
    <article className="flex flex-col items-center min-h-screen">
      <div className="bg-main-blue w-full p-8 rounded-b-xl lg:hidden">
        <h3 className="text-sm text-white font-semibold text-center">
          Log in to your account
        </h3>
      </div>
      <div className="flex-1 flex flex-col lg:justify-center items-center pt-20 pb-4 lg:pt-12 xl:pt-15 w-[95%] max-w-[400px]">
        <LoginForm />
      </div>
    </article>
  );
};

export default Login;
