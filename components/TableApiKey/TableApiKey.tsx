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

const TableApiKey = ({ apiKeys }: { apiKeys: ApiKey[] }) => {
  return (
    <Table
      removeWrapper
      aria-label="Example static collection table"
      className="max-w-3xl m-auto"
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
                  <Button color="danger" onClick={() => console.log("delete")}>
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
