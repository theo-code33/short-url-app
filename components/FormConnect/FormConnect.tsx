import React, { useContext, useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import { UserConnect, UserCreate } from "@/types";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";

const FormConnect = () => {
  const [selected, setSelected] = useState("login");
  const [userForm, setUserForm] = useState<UserConnect | UserCreate>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const { setUser, setToken } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setUserForm({
      email: "",
      password: "",
    });
  }, [selected]);

  const handleLogin = () => {
    if (
      !Object.keys(userForm).includes("passwordConfirm") &&
      !Object.keys(userForm).includes("firstame") &&
      !Object.keys(userForm).includes("lastname") &&
      userForm.email !== "" &&
      userForm.password !== ""
    ) {
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(userForm),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          setUser(data.user);
          setToken(data.token);
          router.push("/admin/dashboard");
        });
    } else {
      enqueueSnackbar("Une erreur est survenue veuillez réessayer", {
        variant: "error",
      });
    }
  };

  const handleRegister = () => {
    if (
      Object.keys(userForm).includes("passwordConfirm") &&
      Object.keys(userForm).includes("firstname") &&
      Object.keys(userForm).includes("lastname") &&
      userForm.email !== "" &&
      userForm.password !== ""
    ) {
      fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(userForm),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          setUser(data.user);
          setToken(data.token);
          router.push("/admin/dashboard");
        });
    } else {
      enqueueSnackbar("Une erreur est survenue veuillez réessayer", {
        variant: "error",
      });
    }
  };

  return (
    // <div className="h-max">
    <Card className="form-connect">
      <CardBody className="h-full">
        <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="login" title="Se connecter">
            <form className="flex flex-col gap-4">
              <Input
                isRequired
                label="Email"
                type="email"
                name="email"
                onChange={(e) => handleChange(e)}
              />
              <Input
                isRequired
                label="Mot de passe"
                type="password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <p className="text-center text-small">
                Need to create an account?{" "}
                <Link size="sm" onPress={() => setSelected("sign-up")}>
                  Sign up
                </Link>
              </p>
              <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" onClick={handleLogin}>
                  Se connecter
                </Button>
              </div>
            </form>
          </Tab>
          <Tab key="sign-up" title="S&rsquo;inscrire">
            <form className="flex flex-col gap-4">
              <Input
                isRequired
                label="Prénom"
                type="text"
                name="firstname"
                onChange={(e) => handleChange(e)}
              />
              <Input
                isRequired
                label="Nom"
                type="text"
                name="lastname"
                onChange={(e) => handleChange(e)}
              />
              <Input
                isRequired
                label="Email"
                type="email"
                name="email"
                onChange={(e) => handleChange(e)}
              />
              <Input
                isRequired
                label="Mot de passe"
                type="password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <Input
                isRequired
                label="Confirmez votre mot de passe"
                type="password"
                name="passwordConfirm"
                onChange={(e) => handleChange(e)}
              />
              <p className="text-center text-small">
                Already have an account?{" "}
                <Link size="sm" onPress={() => setSelected("login")}>
                  Login
                </Link>
              </p>
              <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" onClick={handleRegister}>
                  S&rsquo;inscrire
                </Button>
              </div>
            </form>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
    // </div>
  );
};

export default FormConnect;
