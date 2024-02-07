import { SESSION_STORAGE_KEY } from "@/config";
import { UserType } from "@/types/shared";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    const userString = sessionStorage.getItem(SESSION_STORAGE_KEY) as string;
    if (!userString) {
      return;
    }
    const userFromSessionStorage = JSON.parse(
      userString
    ) as unknown as UserType;
    setUser(userFromSessionStorage);
  }, []);

  return { user };
};
