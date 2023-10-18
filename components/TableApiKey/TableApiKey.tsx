import { ApiKey } from "@/types";
import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";

const TableApiKey = ({ apiKeys }: { apiKeys: ApiKey[] }) => {
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
        enqueueSnackbar("Url supprimée", { variant: "success" });
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  return (
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
        {apiKeys.length > 0 ? (
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
  );
};

export default TableApiKey;
