// components/DynamicTable.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";

import { FormNotFound } from "@/components/form-not-found";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface ColumnConfig<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface DynamicTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  className?: string;
  error?: string;
  description?: string;
  onRowClick?: (item: T) => void;
  dialogEdit?: (item: T) => React.ReactNode;
}

export function DynamicTable<T>({
  data,
  columns,
  className = "text-base",
  error,
  description,
  onRowClick,
  dialogEdit,
}: DynamicTableProps<T>) {
  return (
    <ScrollArea className="h-96">
      <Table className={className}>
        <TableHeader>
          <TableRow className="hover:bg-background">
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index} className="hover:bg-background">
                {columns.map((column) => (
                  <TableCell
                    key={`${column.key}-${index}`}
                    className={column.className}
                  >
                    {column.render(item)}
                  </TableCell>
                ))}
                {onRowClick && (
                  <TableCell className="text-right">
                    <Button
                      className="group px-0"
                      onClick={() => onRowClick && onRowClick(item)}
                    >
                      <span>ดูรายละเอียด</span>
                      <ChevronRight className="size-4 transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
                    </Button>
                  </TableCell>
                )}
                {dialogEdit && (
                  <TableCell className="text-right">
                    {dialogEdit(item)}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-background">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <FormNotFound message={error} description={description} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
