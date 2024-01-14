import AuthSidebar from "@/components/auth/auth-sidebar";
import LoginForm from "@/components/auth/login-form";
import React from "react";

const Login = () => {
  return (
    <article className="flex flex-col items-center justify-center">
      <div className="bg-main-blue w-full p-5 rounded-b-xl lg:hidden">
        <h2 className="text-lg text-white font-semibold text-center">
          Log in to your account
        </h2>
      </div>
      <LoginForm />
    </article>
  );
};

export default Login;
