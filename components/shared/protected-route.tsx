import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export const Protected = async (Component: any) => {
  return async function Protected(props: any) {
    const session = await getSession();
    if (!session) {
      toast.warn("Unauthenticated");
      redirect("/login");
    }

    return <Component {...props} />;
  };
};
