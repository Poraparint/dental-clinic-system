import { TableCell } from "@/components/ui/table";

interface TableInfoProps {
  first?: string | null;
  second?: string | null;
  third?: string | null;
  fourth?: string | null;
  fifth?: string | null;
  sixth?: string | null;
}

export const TableInfo = ({
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
}: TableInfoProps) => {
  return (
    <>
      <TableCell>{first}</TableCell>
      <TableCell>{second}</TableCell>
      <TableCell>{third}</TableCell>
      <TableCell>{fourth}</TableCell>
      <TableCell>{fifth}</TableCell>
      <TableCell>{sixth}</TableCell>
    </>
  );
};
