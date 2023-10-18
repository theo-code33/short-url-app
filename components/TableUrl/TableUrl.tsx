import React, { useContext, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ButtonGroup,
  Button,
  Input,
} from "@nextui-org/react";
import { Url } from "@/types";
import { enqueueSnackbar } from "notistack";
import { UserContext } from "@/context/UserContext";

const TableUrl = ({ urls }: { urls: Url[] }) => {
  const [newUrl, setNewUrl] = useState<string>("");

  const { user } = useContext(UserContext);

  const deleteUrl = async (slug: string) => {
    await fetch(`/api/deleteUrl?slug=${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        enqueueSnackbar("Url supprimée", { variant: "success" });
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUrl(e.target.value);
  };

  const createUrl = async () => {
    if (newUrl === "") return enqueueSnackbar("Url vide", { variant: "error" });
    console.log(localStorage.getItem("token"));

    await fetch(`/api/createUrl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ baseUrl: newUrl, user: user?.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        enqueueSnackbar("Url créée", { variant: "success" });
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  return (
    <>
      <Input
        name="lastname"
        label="Nom"
        value={newUrl}
        onChange={(e) => handleChange(e)}
      />
      <Button color="primary" onClick={() => createUrl()}>
        Créer une url
      </Button>
      <Table
        removeWrapper
        aria-label="Example static collection table"
        className="max-w-3xl m-auto"
      >
        <TableHeader>
          <TableColumn>Base url</TableColumn>
          <TableColumn>Slug</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {urls.length > 0 ? (
            urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell>{url.baseUrl}</TableCell>
                <TableCell>{url.slug}</TableCell>
                <TableCell>
                  <ButtonGroup>
                    <Button color="primary">Copier</Button>
                    <Button color="success">Ouvrir</Button>
                    <Button color="danger" onClick={() => deleteUrl(url.slug)}>
                      Supprimer
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center">No urls</TableCell>
              <TableCell align="center">No urls</TableCell>
              <TableCell align="center">No urls</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default TableUrl;
