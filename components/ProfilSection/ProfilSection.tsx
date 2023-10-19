import { UserContext } from "@/context/UserContext";
import { User, UserUpdate } from "@/types";
import { Button, Input } from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";

const ProfilSection = ({ user }: { user: User }) => {
  const [modifiedUser, setModifiedUser] = useState<UserUpdate>({
    email: "",
    firstname: "",
    lastname: "",
  });
  const [isModified, setIsModified] = useState<boolean>(false);

  const { setUser } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedUser({
      ...modifiedUser,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async () => {
    await fetch(`/api/updateUser?id=${user.id}`, {
      method: "PATCH",
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
        enqueueSnackbar("Votre profil à bien était modifié", {
          variant: "success",
        });
      })
      .catch((err) => {
        enqueueSnackbar("Erreur lors de la modification", { variant: "error" });
        console.error(err);
      });
  };

  useEffect(() => {
    setModifiedUser({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  }, [user]);
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-3">Mon profil</h2>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
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
        </div>
        <Input
          name="email"
          label="Email"
          value={modifiedUser.email}
          isReadOnly={!isModified}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="flex mt-5 gap-2">
        {isModified && (
          <Button
            onClick={() => {
              setIsModified(false);
              setModifiedUser({
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
              });
            }}
          >
            Annuler
          </Button>
        )}
        <Button
          color={isModified ? "primary" : "default"}
          onClick={() => {
            if (isModified) {
              updateUser();
            }
            setIsModified(!isModified);
          }}
        >
          {isModified ? "Enregistrer" : "Modifier mon profil"}
        </Button>
      </div>
    </div>
  );
};

export default ProfilSection;
