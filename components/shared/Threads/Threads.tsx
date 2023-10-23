"use client";
import React from "react";
import { dashboard } from "@/data/dashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LiveContainer from "../boxContainer/LiveContainer";
import TableHandleDelete from "./TableHandleDelete";

const Threads = () => {
  const data = dashboard;
  const threads = data.Threads;

  const handleThreadDelete = () => {
    console.log();
    
  };
  

  return (
    <LiveContainer logHeight="h-[30vh]" title="Live Threads 1">
      <Table className="background-light800_dark400 text-[0.6rem] ">
        <TableHeader>
          <TableRow className="text-center max-2xl:text-[0.5rem]">
            <TableHead>Function</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Context</TableHead>
            <TableHead>Wait Time</TableHead>
            <TableHead>Elapsed Time</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=" text-center dark:text-slate-400 max-2xl:text-[0.5rem]">
          {Object.keys(threads).map((logKey) => {
            const threadsEntry =
              threads[logKey as unknown as keyof typeof threads];
            return (
              <TableRow className="text-center" key={logKey}>
                <TableCell
                  className="max-w-[300px] text-left"
                  title={`Method: ${threadsEntry.Function}`}
                >
                  {threadsEntry.Function}
                </TableCell>
                <TableCell className="text-left" title={`Name: ${threadsEntry.Name}`}>
                  {threadsEntry.Name}
                </TableCell>
                <TableCell title={`Type: ${threadsEntry.Type}`}>
                  {threadsEntry.Type}
                </TableCell>
                <TableCell title={`Context: ${threadsEntry.Context}`}>
                  {threadsEntry.Context}
                </TableCell>
                <TableCell title={`WaitTime: ${threadsEntry.WaitTime}`}>
                  {threadsEntry.WaitTime}
                </TableCell>
                <TableCell title={`ElapsedTime: ${threadsEntry.ElapsedTime}`}>
                  {threadsEntry.ElapsedTime}
                </TableCell>
                <TableCell title={`State: ${threadsEntry.State}`}>
                  {threadsEntry.State}
                </TableCell>
                <TableHandleDelete onDelete={handleThreadDelete} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </LiveContainer>
  );
};

export default Threads;
