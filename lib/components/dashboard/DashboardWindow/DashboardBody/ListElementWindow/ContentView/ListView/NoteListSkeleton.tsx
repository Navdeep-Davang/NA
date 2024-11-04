import { Skeleton } from "@/components/ui/skeleton"; // Adjust path based on your project structure
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

const NoteListSkeleton: React.FC = () => {
  const rows = Array.from({ length: 10 }); // Render 5 rows as a sample placeholder

  return (
    <Table>
      <TableHeader>
        <TableRow>
            <TableCell><Skeleton className="w-32 h-5 bg-white/20" /></TableCell> {/* Note Title skeleton */}
            <TableCell><Skeleton className="w-24 h-5 bg-white/20" /></TableCell> {/* Date Created skeleton */}
            <TableCell><Skeleton className="w-24 h-5 bg-white/20" /></TableCell> {/* Last Updated skeleton */}
            <TableCell><Skeleton className="w-16 h-5 bg-white/20" /></TableCell> {/* Actions skeleton */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((_, index) => (
          <TableRow
            key={index}
            className="hover:bg-white/20 border-none rounded-lg overflow-hidden transition duration-300 ease-in-out"
          >
            <TableCell>
              <div className="flex items-center gap-2">
                <Skeleton className="w-24 h-20 rounded-lg bg-white/20" /> {/* Image skeleton */}
                <Skeleton className="w-40 h-6 bg-white/20" /> {/* Title skeleton */}
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-6 bg-white/20" /> {/* Date Created skeleton */}
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-6 bg-white/20" /> {/* Last Updated skeleton */}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Skeleton className="w-6 h-6 rounded-md bg-white/20" /> {/* Action icon skeleton */}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default NoteListSkeleton;
