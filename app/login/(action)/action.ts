"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const loginAdmin = async (formData: FormData) => {
  const adminCookie = cookies().get("admin");

  const username = formData.get("name");
  const password = formData.get("password");

  if (username == "admin" && password == "@123@pass") {
    cookies().set("admin", "isdfkakfa");

    redirect("/admin");
  }

  console.log(formData);
};
