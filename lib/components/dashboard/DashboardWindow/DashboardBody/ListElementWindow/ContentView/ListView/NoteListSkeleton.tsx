import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

const NoteListSkeleton: React.FC = () => {
  const rows = Array.from({ length: 10 });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell><Skeleton className="w-32 h-5 theme-skeleton-text" /></TableCell>
          <TableCell><Skeleton className="w-24 h-5 theme-skeleton-text hidden md:table-cell" /></TableCell>
          <TableCell><Skeleton className="w-24 h-5 theme-skeleton-text hidden md:table-cell" /></TableCell>
          <TableCell className="flex justify-end sm:justify-start"><Skeleton className="w-16 h-5 theme-skeleton-text" /></TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((_, index) => (
          <TableRow key={index} className="hover:theme-skeleton-bg border-none rounded-lg overflow-hidden transition duration-300 ease-in-out">
            <TableCell>
              <div className="flex items-center gap-2">
                <Skeleton className="w-24 h-20 hidden sm:block rounded-lg theme-skeleton-text" />
                <Skeleton className="w-40 h-6 theme-skeleton-text" />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-6 theme-skeleton-text hidden md:table-cell" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-6 theme-skeleton-text hidden md:table-cell" />
            </TableCell>
            <TableCell>
              <div className="flex gap-2 justify-end sm:justify-center">
                <Skeleton className="w-6 h-6 rounded-md theme-skeleton-text" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default NoteListSkeleton;
