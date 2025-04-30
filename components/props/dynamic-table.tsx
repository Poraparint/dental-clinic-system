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
import { FormNotFound } from "@/components/form-not-found";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  url?: string;
  urlname?: string;
  onRowClick?: (item: T) => void;
}

export function DynamicTable<T>({
  data,
  columns,
  className = "text-base",
  error,
  description,
  url,
  urlname,
  onRowClick,
}: DynamicTableProps<T>) {
  return (
    <ScrollArea className="h-96">
      <Table className={className}>
        <TableHeader>
          <TableRow>
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
              <TableRow
                key={index}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns.map((column) => (
                  <TableCell
                    key={`${column.key}-${index}`}
                    className={column.className}
                  >
                    {column.render(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <FormNotFound
                  message={error || "Unknown error"}
                  description={description || ""}
                  url={url || ""}
                  urlname={urlname || ""}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
