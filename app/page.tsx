import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";

const Main = async () => {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }

  return <div>Main</div>;
};

export default Main;
