'use client';

import { FC } from 'react';
import { useListInventoryMovements } from '@repo/api-client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert";
import { Terminal } from "lucide-react";
import { LocationInventoryMovementRow } from './LocationInventoryMovementRow'; 

interface LocationInventoryMovementsListProps {
  locationId: string;
}

export const LocationInventoryMovementsList: FC<LocationInventoryMovementsListProps> = ({ locationId }) => {
  const { data: movementsData, isLoading, isError, error } = useListInventoryMovements({ queryParams: { locationId } });

  if (isLoading) {
    return (
      <div data-testid="loc-inventory-movements-list-loading" className="space-y-2">
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
      <Alert variant="destructive" data-testid="loc-inventory-movements-list-error">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error Loading Inventory Movements</AlertTitle>
        <AlertDescription>
          {error?.message || "An unexpected error occurred."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!movementsData || movementsData.length === 0) {
    return <p data-testid="loc-inventory-movements-list-empty">No inventory movements found for this location.</p>;
  }

  return (
    <div data-testid="loc-inventory-movements-list-container">
      <h3 className="text-lg font-semibold mb-2" data-testid="loc-inventory-movements-list-title">Inventory Movements</h3>
      <Table data-testid="loc-inventory-movements-table">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Ingredient Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Quantity Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movementsData.map((movement) => (
            <LocationInventoryMovementRow
              key={movement.id} 
              movementId={movement.id!} 
              ingredientId={movement.ingredientId!} 
              quantityChange={movement.quantityChange !== undefined ? movement.quantityChange : null}
              type={movement.type !== undefined ? movement.type : null}
              createdAt={movement.createdAt !== undefined ? movement.createdAt : null}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
