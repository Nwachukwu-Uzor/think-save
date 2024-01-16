import AuthLayout from "@/components/auth/auth-layout";
import RegisterForm from "@/components/auth/register-form";
import React from "react";

const Register = () => {
  return (
    <AuthLayout>
      <article className="flex flex-col items-center min-h-screen">
        <div className="bg-main-blue w-full p-8 rounded-b-xl lg:hidden">
          <h2 className="text-lg text-white font-semibold text-center">
            Get started today
          </h2>
        </div>
        <div className="flex-1 flex flex-col lg:justify-center items-center pt-20 lg:pt-12 xl:pt-15 w-[95%] max-w-[400px] xl:max-w-[600px]">
          <RegisterForm />
        </div>
      </article>
    </AuthLayout>
  );
};

export default Register;
