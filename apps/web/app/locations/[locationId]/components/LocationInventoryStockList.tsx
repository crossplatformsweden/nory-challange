'use client';

import { FC } from 'react';
import { useListInventoryStock } from '@repo/api-client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert";
import { Terminal } from "lucide-react";
import { LocationInventoryStockRow } from './LocationInventoryStockRow'; // Import the row sub-component

interface LocationInventoryStockListProps {
  locationId: string;
}

export const LocationInventoryStockList: FC<LocationInventoryStockListProps> = ({ locationId }) => {
  const { data: inventoryStockData, isLoading, isError, error } = useListInventoryStock({ queryParams: { locationId } });

  if (isLoading) {
    return (
      <div data-testid="loc-inventory-stock-list-loading" className="space-y-2">
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
      <Alert variant="destructive" data-testid="loc-inventory-stock-list-error">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error Loading Inventory Stock</AlertTitle>
        <AlertDescription>
          {error?.message || "An unexpected error occurred."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!inventoryStockData || inventoryStockData.length === 0) {
    return <p data-testid="loc-inventory-stock-list-empty">No inventory stock data found for this location.</p>;
  }

  return (
    <div data-testid="loc-inventory-stock-list-container">
      <h3 className="text-lg font-semibold mb-2" data-testid="loc-inventory-stock-list-title">Inventory Stock Levels</h3>
      <Table data-testid="loc-inventory-stock-table">
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient Name</TableHead>
            <TableHead className="text-right">Current Quantity</TableHead>
            <TableHead className="text-right">Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryStockData.map((item) => (
            <LocationInventoryStockRow
              key={item.id} // Assuming InventoryStock has an 'id' field
              locationInventoryStockId={item.id!} // Pass the unique ID
              ingredientId={item.ingredientId!} // Assert non-null as it's required
              quantity={item.quantity !== undefined ? item.quantity : null} // Handle quantity
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
