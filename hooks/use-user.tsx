import { SESSION_STORAGE_KEY } from "@/config";
import { UserType } from "@/types/shared";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    const userFromSessionStorage = JSON.parse(
      sessionStorage.getItem(SESSION_STORAGE_KEY) as string
    ) as unknown as UserType;
    setUser(userFromSessionStorage);
  }, []);

  return { user };
};
