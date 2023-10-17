import FormConnect from "@/components/FormConnect";
import { useEffect } from "react";

const Admin = () => {
  //   useEffect(() => {
  //     console.log("Admin");

  //     fetch("/api/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: "test2@test.com",
  //         password: "1234567890",
  //         firstname: "test",
  //         lastname: "test",
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((res) => console.log(res));
  //   }, []);
  return (
    <div className="flex aligns-center w-full justify-center h-screen">
      <FormConnect />
    </div>
  );
};

export default Admin;
