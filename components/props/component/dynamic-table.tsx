"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

import { FormNotFound } from "@/components/form-not-found";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";
import { handleSoftDelete } from "@/lib/common/soft-delete";
import { onSoftDeleteProps } from "@/interface/props";
import { ConfirmDeleteDialog } from "@/components/shared/dialog/confirm-dialog";

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
  onSoftDelete?: onSoftDeleteProps<T>["onSoftDelete"];
  onDeleteResult?: onSoftDeleteProps<T>["onDeleteResult"];
}

export function DynamicTable<T>({
  data,
  columns,
  className = "text-base",
  error,
  description,
  onRowClick,
  dialogEdit,
  onSoftDelete,
  onDeleteResult
}: DynamicTableProps<T>) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block">
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
                    <RoleGate
                      allowedRole={[
                        CompanyRole.MANAGER,
                        CompanyRole.COMANAGER,
                        CompanyRole.DENTIST,
                      ]}
                    >
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
                      {onSoftDelete && (
                        <TableCell className="text-right">
                          <ConfirmDeleteDialog
                            onConfirm={() =>
                              handleSoftDelete<T>({
                                item,
                                onSoftDelete,
                                onDeleteResult,
                              })
                            }
                          />
                        </TableCell>
                      )}
                    </RoleGate>
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-background">
                  <TableCell
                    colSpan={
                      columns.length + (onRowClick || dialogEdit ? 1 : 0)
                    }
                    className="h-24 text-center"
                  >
                    <FormNotFound message={error} description={description} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden ">
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {data.length > 0 ? (
              data.map((item, index) => (
                <Card key={index} className="py-12 relative">
                  <CardContent>
                    <div className="flex flex-col space-y-3">
                      {columns.map((column) => (
                        <div
                          key={`${column.key}-${index}`}
                          className="flex justify-between space-y-1"
                        >
                          <div className="text-sm font-medium text-muted-foreground">
                            {column.header} :
                          </div>
                          <div className={column.className}>
                            {column.render(item)}
                          </div>
                        </div>
                      ))}

                      <RoleGate
                        allowedRole={[
                          CompanyRole.MANAGER,
                          CompanyRole.COMANAGER,
                          CompanyRole.DENTIST,
                        ]}
                      >
                        <div className="flex flex-col gap-4">
                          {onRowClick && (
                            <Button
                              className="group px-0 w-full"
                              onClick={() => onRowClick && onRowClick(item)}
                            >
                              <span>ดูรายละเอียด</span>
                              <ChevronRight className="size-4 transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
                            </Button>
                          )}
                          {dialogEdit && (
                            <div className="absolute top-2 right-2">
                              {dialogEdit(item)}
                            </div>
                          )}

                          {onSoftDelete && (
                            <ConfirmDeleteDialog
                              onConfirm={() =>
                                handleSoftDelete<T>({
                                  item,
                                  onSoftDelete,
                                  onDeleteResult,
                                })
                              }
                            />
                          )}
                        </div>
                      </RoleGate>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="w-full">
                <CardContent className="p-8">
                  <FormNotFound message={error} description={description} />
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
