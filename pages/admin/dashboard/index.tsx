import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Dashboard;
