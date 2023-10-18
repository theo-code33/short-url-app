import { UserContext } from "@/context/UserContext";
import { User } from "@/types";
import { Button, Input } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";

const ProfilSection = ({ user }: { user: User }) => {
  const [modifiedUser, setModifiedUser] = useState<User>({ ...user });
  const [isModified, setIsModified] = useState<boolean>(false);

  const { setUser } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedUser({
      ...modifiedUser,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async () => {
    await fetch("/api/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(modifiedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setIsModified(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setModifiedUser({ ...user });
  }, [user]);
  return (
    <>
      <Input
        name="firstname"
        label="Prénom"
        value={modifiedUser.firstname}
        isReadOnly={!isModified}
        onChange={(e) => handleChange(e)}
      />
      <Input
        name="lastname"
        label="Nom"
        value={modifiedUser.lastname}
        isReadOnly={!isModified}
        onChange={(e) => handleChange(e)}
      />
      <Input
        name="email"
        label="Email"
        value={modifiedUser.email}
        isReadOnly={!isModified}
        onChange={(e) => handleChange(e)}
      />

      <Button
        onClick={() => {
          if (isModified) {
            updateUser();
          }
          setIsModified(!isModified);
        }}
      >
        {isModified ? "Enregistrer" : "Modifier"}
      </Button>
    </>
  );
};

export default ProfilSection;
