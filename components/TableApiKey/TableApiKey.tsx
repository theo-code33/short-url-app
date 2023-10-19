import { UserContext } from "@/context/UserContext";
import { ApiKey, User } from "@/types";
import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { IconCopy, IconTrash } from "@tabler/icons-react";
import { enqueueSnackbar } from "notistack";
import { useContext } from "react";

const TableApiKey = ({ apiKeys }: { apiKeys: ApiKey[] }) => {
  const { user, setUser } = useContext(UserContext);
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
        setUser({
          ...user,
          apiKeys: (user?.apiKeys as ApiKey[]).filter((key) => key.id !== id),
        } as User);
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
        setUser({
          ...user,
          apiKeys: [...(user?.apiKeys as ApiKey[]), data],
        } as User);
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
    <div className="w-full flex flex-col">
      <h2 className="text-2xl font-bold mb-3">Clés Api</h2>
      <div className="flex w-full">
        <Button
          color="primary"
          onClick={() => createApiKey()}
          className="max-w-max mb-5 self-end"
        >
          Générer une nouvelle clé api
        </Button>
      </div>
      <Table
        removeWrapper
        aria-label="Example static collection table"
        // className="max-w-3xl m-auto pt-4"
      >
        <TableHeader>
          <TableColumn>Api Key</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {apiKeys && apiKeys.length > 0 ? (
            apiKeys.map((key) => (
              <TableRow key={key.id}>
                <TableCell>{`${key.apiKey.slice(
                  0,
                  7
                )}***************************`}</TableCell>
                <TableCell>
                  <div className="flex gap-4 items-center">
                    <Tooltip content="Copier la clé api">
                      <Button
                        isIconOnly
                        onClick={() => {
                          window.navigator.clipboard.writeText(key.apiKey);
                          enqueueSnackbar("Clé api copiée", {
                            variant: "success",
                          });
                        }}
                      >
                        <IconCopy />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Supprimer la clé api">
                      <Button
                        isIconOnly
                        color="danger"
                        onClick={() => deleteApiKey(key.id)}
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
              <TableCell align="center">No apiKeys</TableCell>
              <TableCell align="center">No apiKeys</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableApiKey;
