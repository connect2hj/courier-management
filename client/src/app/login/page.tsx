"use client";
import { SignIn } from "@/components/Login";
import { UserLayout } from "@/components/UserLayout";

const Page = () => {
  return (
    <UserLayout>
      <SignIn />
    </UserLayout>
  );
};

export default Page;
