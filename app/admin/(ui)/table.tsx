"use client";

import { Scores } from "@/types";
import { Table } from "flowbite-react";

export function ScoreTable({ scores }: { scores: Scores[] }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>S/N</Table.HeadCell>
          <Table.HeadCell>Id</Table.HeadCell>
          <Table.HeadCell>Registration Number</Table.HeadCell>
          <Table.HeadCell>Score</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {scores.map((item, index) => {
            return (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.id}
                </Table.Cell>
                <Table.Cell>{item.reg}</Table.Cell>
                <Table.Cell>{item.score}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
