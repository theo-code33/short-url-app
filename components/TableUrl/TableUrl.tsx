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
  Tooltip,
} from "@nextui-org/react";
import { Url, User } from "@/types";
import { enqueueSnackbar } from "notistack";
import { UserContext } from "@/context/UserContext";
import { IconCopy, IconExternalLink, IconTrash } from "@tabler/icons-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const TableUrl = ({ urls }: { urls: Url[] }) => {
  const [newUrl, setNewUrl] = useState<string>("");

  const { user, setUser } = useContext(UserContext);

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
        setUser({
          ...user,
          urls: (user?.urls as Url[]).filter((url) => url.slug !== slug),
        } as User);
        enqueueSnackbar("Url supprimée", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar("Erreur lors de la suppression de l'url", {
          variant: "error",
        });
        console.error(err);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUrl(e.target.value);
  };

  const createUrl = async () => {
    if (newUrl === "") return enqueueSnackbar("Url vide", { variant: "error" });
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
        setUser({
          ...user,
          urls: [...(user?.urls as Url[]), data],
        } as User);
        enqueueSnackbar("Url créée", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar("Erreur lors de la création de l'url", {
          variant: "error",
        });
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-center items-center gap-4">
        <Input
          label="Nouvel Url"
          value={newUrl}
          onChange={(e) => handleChange(e)}
        />
        <Button color="primary" onClick={() => createUrl()}>
          Créer une url
        </Button>
      </div>
      <Table removeWrapper aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Base url</TableColumn>
          <TableColumn>Slug</TableColumn>
          <TableColumn>Clicks</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {urls && urls.length > 0 ? (
            urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell>
                  <Tooltip content={url.baseUrl}>
                    <span>
                      {url.baseUrl.length > 20
                        ? `${url.baseUrl.slice(0, 30)}...`
                        : url.baseUrl}
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell>{url.slug}</TableCell>
                <TableCell>{url.clicks}</TableCell>
                <TableCell>
                  <div className="flex gap-4 items-center">
                    <Tooltip content="Copier">
                      <Button
                        isIconOnly
                        onClick={() => {
                          window.navigator.clipboard.writeText(
                            `${baseUrl}/${url.slug}`
                          );
                          enqueueSnackbar("Url copiée", { variant: "success" });
                        }}
                      >
                        <IconCopy />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Ouvrir dans un nouvel onglet">
                      <Button
                        isIconOnly
                        onClick={() => {
                          window.open(`${baseUrl}/${url.slug}`);
                        }}
                      >
                        <IconExternalLink />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Supprimer l'url">
                      <Button
                        isIconOnly
                        color="danger"
                        onClick={() => deleteUrl(url.slug)}
                      >
                        <IconTrash />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center">No urls</TableCell>
              <TableCell align="center">No urls</TableCell>
              <TableCell align="center">No urls</TableCell>
              <TableCell align="center">No urls</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableUrl;
