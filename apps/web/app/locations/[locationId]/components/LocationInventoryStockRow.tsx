'use client';

import { FC } from 'react';
import { useGetIngredientById } from '@repo/api-client';
import { TableCell, TableRow } from "@repo/ui/components/ui/table";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

interface LocationInventoryStockRowProps {
  locationInventoryStockId: string; // Unique ID for the row key and testid
  ingredientId: string;
  quantity: number | null;
}

export const LocationInventoryStockRow: FC<LocationInventoryStockRowProps> = ({
  locationInventoryStockId,
  ingredientId,
  quantity,
}) => {
  const { data: ingredientData, isLoading, isError } = useGetIngredientById(ingredientId);

  return (
    <TableRow data-testid={`loc-inventory-stock-row-${locationInventoryStockId}`}>
      <TableCell data-testid={`loc-inventory-ingredient-name-${ingredientId}`}>
        {isLoading ? (
          <Skeleton className="h-4 w-3/4" />
        ) : isError ? (
          <span className="text-red-500">Error loading name</span>
        ) : (
          ingredientData?.name || 'N/A'
        )}
      </TableCell>
      <TableCell data-testid={`loc-inventory-quantity-${ingredientId}`} className="text-right">
        {quantity !== null ? quantity : 'N/A'}
      </TableCell>
      <TableCell data-testid={`loc-inventory-unit-${ingredientId}`} className="text-right">
        {isLoading ? (
          <Skeleton className="h-4 w-1/2" />
        ) : isError ? (
          <span className="text-red-500">N/A</span> 
        ) : (
          ingredientData?.unit || 'N/A'
        )}
      </TableCell>
    </TableRow>
  );
};
