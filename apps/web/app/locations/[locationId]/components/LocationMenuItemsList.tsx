'use client';

import { FC } from 'react';
import { useListLocationMenuItems } from '@repo/api-client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert";
import { Terminal } from "lucide-react";
import { LocationMenuItemRow } from './LocationMenuItemRow'; // Import the row sub-component

interface LocationMenuItemsListProps {
  locationId: string;
}

export const LocationMenuItemsList: FC<LocationMenuItemsListProps> = ({ locationId }) => {
  const { data: menuItemsData, isLoading, isError, error } = useListLocationMenuItems({ queryParams: { locationId } });

  if (isLoading) {
    return (
      <div data-testid="menu-items-list-loading" className="space-y-2">
        <Skeleton className="h-8 w-1/3" /> {/* Title skeleton */}
        <Skeleton className="h-10 w-full" /> {/* Header skeleton */}
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" /> // Row skeleton
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" data-testid="menu-items-list-error">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error Loading Menu Items</AlertTitle>
        <AlertDescription>
          {error?.message || "An unexpected error occurred."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!menuItemsData || menuItemsData.length === 0) {
    return <p data-testid="menu-items-list-empty">No menu items found for this location.</p>;
  }

  return (
    <div data-testid="menu-items-list-container">
      <h3 className="text-lg font-semibold mb-2" data-testid="menu-items-list-title">Menu Items</h3>
      <Table data-testid="menu-items-list-table">
        <TableHeader>
          <TableRow>
            <TableHead>Recipe Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItemsData.map((item) => (
            <LocationMenuItemRow
              key={item.id} // Assuming LocationMenuItem has an 'id' field for the key
              locationMenuItemId={item.id!} // Pass the unique ID of the LocationMenuItem
              recipeId={item.recipeId!} // Assert non-null as it's required
              price={item.price !== undefined ? item.price : null} // Handle price potentially being undefined
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
