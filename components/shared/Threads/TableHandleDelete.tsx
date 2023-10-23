"use client"
import { TableCell } from "@/components/ui/table";
import React from "react";
import DeleteButton from "../deleteBtn/DeleteButton";

interface Props {
  onDelete: () => void;
  id: string;
}

const TableHandleDelete = ({onDelete, id}: Props) => {

    const handleDelete = () => {
        const confirm = window.confirm(
          "Are you sure you want to delete this thread?"
        );
        if (confirm) {
          console.log("thread deleted");
          onDelete();
        }
      };

  return (
    <TableCell title="Delete">
      <DeleteButton onDelete={handleDelete} id={id}/>
    </TableCell>
  );
};

export default TableHandleDelete;
