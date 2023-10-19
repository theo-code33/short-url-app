import { UserContext } from "@/context/UserContext";
import { ApiKey } from "@/types";
import {
  Button,
  ButtonGroup,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";
import { useContext } from "react";

const TableApiKey = ({ apiKeys }: { apiKeys: ApiKey[] }) => {
  const { user } = useContext(UserContext);
  const deleteApiKey = async (id: number) => {
    await fetch(`/api/deleteApiKey?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        enqueueSnackbar("Clé Api supprimée", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar("Erreur lors de la suppression de la clé api", {
          variant: "error",
        });
        console.error(err);
      });
  };

  const createApiKey = async () => {
    await fetch(`/api/createApiKey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ user: user?.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        enqueueSnackbar("Clé api créée", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar("Erreur lors de la création de la clé api", {
          variant: "error",
        });
        console.error(err);
      });
  };

  return (
    <>
      <Button color="primary" onClick={() => createApiKey()}>
        Générer une nouvelle clé api
      </Button>
      <Table
        removeWrapper
        aria-label="Example static collection table"
        className="max-w-3xl m-auto pt-4"
      >
        <TableHeader>
          <TableColumn>Api Key</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {apiKeys && apiKeys.length > 0 ? (
            apiKeys.map((key) => (
              <TableRow key={key.id}>
                <TableCell>{key.apiKey}</TableCell>
                <TableCell>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      onClick={() => {
                        window.navigator.clipboard.writeText(key.apiKey);
                      }}
                    >
                      Copier
                    </Button>
                    <Button color="danger" onClick={() => deleteApiKey(key.id)}>
                      Supprimer
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center">No apiKeys</TableCell>
              <TableCell align="center">No apiKeys</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default TableApiKey;
