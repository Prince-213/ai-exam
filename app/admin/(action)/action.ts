"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutAdmin = async (formData: FormData) => {
  const adminCookie = cookies().get("admin");

  if (adminCookie) {
    cookies().delete("admin");
    redirect("/");
  }
};
