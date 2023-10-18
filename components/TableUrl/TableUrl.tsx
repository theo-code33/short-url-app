import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ButtonGroup,
  Button,
} from "@nextui-org/react";
import { Url } from "@/types";

const TableUrl = ({ urls }: { urls: Url[] }) => {
  const deleteUrl = async (slug: string) => {
    console.log("delete", slug);
    console.log("token", localStorage.getItem("token"));

    await fetch(`/api/deleteUrl?slug=${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("jnjijnijnin");
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
  );
};

export default TableUrl;
