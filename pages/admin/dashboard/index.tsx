import ProfilSection from "@/components/ProfilSection";
import TableApiKey from "@/components/TableApiKey";
import TableUrl from "@/components/TableUrl";
import { UserContext } from "@/context/UserContext";
import { ApiKey, Token, Url, User } from "@/types";
import { getUserFromLocalToken } from "@/utils/jwt";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user?.email) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async () => {
    const token = (await getUserFromLocalToken()) as Token;
    if (token === null) {
      router.push("/admin");
      return;
    }
    await fetch(`/api/getOneByEmail?email=${token.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUser(data);
          router.push("/admin/dashboard");
        } else {
          router.push("/admin");
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        router.push("/admin");
      });
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <ProfilSection user={user as User} />
      <div className="flex justify-center flex-col items-center max-w-3xl m-auto gap-10">
        <TableUrl urls={user?.urls as Url[]} />
        <TableApiKey apiKeys={user?.apiKeys as ApiKey[]} />
      </div>
    </div>
  );
};

export default Dashboard;
