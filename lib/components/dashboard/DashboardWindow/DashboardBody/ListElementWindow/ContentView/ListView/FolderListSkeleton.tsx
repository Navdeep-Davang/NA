import { Skeleton } from "@/components/ui/skeleton"; // Adjust path based on your project structure
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

const FolderListSkeleton: React.FC = () => {
  const rows = Array.from({ length: 10 }); // Render 10 rows as a sample placeholder

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell className="list-table-header-text">
            <Skeleton className="w-32 h-5 theme-skeleton-text" /> {/* Folder Name skeleton */}
          </TableCell>
          <TableCell className="list-table-header-text">
            <Skeleton className="w-20 h-5 theme-skeleton-text" /> {/* Files skeleton */}
          </TableCell>
          <TableCell className="list-table-header-text">
            <Skeleton className="w-24 h-5 theme-skeleton-text" /> {/* Date Created skeleton */}
          </TableCell>
          <TableCell className="list-table-header-text">
            <Skeleton className="w-24 h-5 theme-skeleton-text" /> {/* Last Updated skeleton */}
          </TableCell>
          <TableCell className="list-table-header-text">
            <Skeleton className="w-16 h-5 theme-skeleton-text" /> {/* Actions skeleton */}
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((_, index) => (
          <TableRow
            key={index}
            className="hover:bg-white/10 border-none rounded-lg overflow-hidden transition duration-300 ease-in-out"
          >
            <TableCell className="p-5">
              <div className="flex items-center gap-2">
                <div className="FolderIcon w-16 h-12 p-2 flex-col justify-start items-start gap-2.5 inline-flex">
                  <Skeleton className="w-10 h-10 theme-skeleton-text rounded-lg" /> {/* Folder icon skeleton */}
                </div>
                <Skeleton className="w-24 h-6 theme-skeleton-text" /> {/* Folder Name skeleton */}
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="w-20 h-6 theme-skeleton-text" /> {/* File Count skeleton */}
            </TableCell>
            <TableCell>
              <Skeleton className="w-28 h-6 theme-skeleton-text" /> {/* Date Created skeleton */}
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-6 theme-skeleton-text" /> {/* Last Updated skeleton */}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Skeleton className="w-6 h-6 rounded-md theme-skeleton-text" /> {/* Action icon skeleton */}
                <Skeleton className="w-6 h-6 rounded-md theme-skeleton-text" /> {/* Additional action icon skeleton (if needed) */}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FolderListSkeleton;
