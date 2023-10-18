import TableApiKey from "@/components/TableApiKey/TableApiKey";
import TableUrl from "@/components/TableUrl";
import { UserContext } from "@/context/UserContext";
import { Token, Url } from "@/types";
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
        router.push("/admin");
      });
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
      <div className="flex justify-center flex-col items-center">
        {user?.urls && <TableUrl urls={user?.urls as Url[]} />}
        {user?.apiKeys && <TableApiKey apiKeys={user?.apiKeys} />}
      </div>
    </div>
  );
};

export default Dashboard;
