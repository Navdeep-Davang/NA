import { Skeleton } from "@/components/ui/skeleton"; // Adjust path based on your project structure
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

const NoteListSkeleton: React.FC = () => {
  const rows = Array.from({ length: 10 }); // Render 5 rows as a sample placeholder

  return (
    <Table>
      <TableHeader>
        <TableRow>
            <TableCell><Skeleton className="w-32 h-5 theme-skeleton-text" /></TableCell> {/* Note Title skeleton */}
            <TableCell><Skeleton className="w-24 h-5 theme-skeleton-text" /></TableCell> {/* Date Created skeleton */}
            <TableCell><Skeleton className="w-24 h-5 theme-skeleton-text" /></TableCell> {/* Last Updated skeleton */}
            <TableCell><Skeleton className="w-16 h-5 theme-skeleton-text" /></TableCell> {/* Actions skeleton */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((_, index) => (
          <TableRow
            key={index}
            className="hover:theme-skeleton-bg border-none rounded-lg overflow-hidden transition duration-300 ease-in-out"
          >
            <TableCell>
              <div className="flex items-center gap-2">
                <Skeleton className="w-24 h-20 rounded-lg theme-skeleton-text" /> {/* Image skeleton */}
                <Skeleton className="w-40 h-6 theme-skeleton-text" /> {/* Title skeleton */}
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-6 theme-skeleton-text" /> {/* Date Created skeleton */}
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-6 theme-skeleton-text" /> {/* Last Updated skeleton */}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Skeleton className="w-6 h-6 rounded-md theme-skeleton-text" /> {/* Action icon skeleton */}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default NoteListSkeleton;
