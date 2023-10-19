import FormConnect from "@/components/FormConnect";
import { Token } from "@/types";
import { getUserFromLocalToken } from "@/utils/jwt";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Admin = () => {
  const router = useRouter();
  useEffect(() => {
    const token = getUserFromLocalToken() as Token;
    if (token !== null) {
      router.push("/admin/dashboard");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex items-center w-full justify-center h-screen">
      <FormConnect />
    </div>
  );
};

export default Admin;
