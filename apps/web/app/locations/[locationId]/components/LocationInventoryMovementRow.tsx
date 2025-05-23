'use client';

import { FC } from 'react';
import { useGetIngredientById } from '@repo/api-client';
import { TableCell, TableRow } from "@repo/ui/components/ui/table";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { format } from 'date-fns';

interface LocationInventoryMovementRowProps {
  movementId: string; 
  ingredientId: string;
  quantityChange: number | null;
  type: string | null; // e.g., 'SALE', 'WASTE', 'RECEIVED', 'ADJUSTMENT'
  createdAt: string | null; // ISO date string
}

export const LocationInventoryMovementRow: FC<LocationInventoryMovementRowProps> = ({
  movementId,
  ingredientId,
  quantityChange,
  type,
  createdAt,
}) => {
  const { data: ingredientData, isLoading, isError } = useGetIngredientById(ingredientId);

  const formattedDate = createdAt ? format(new Date(createdAt), 'PPpp') : 'N/A'; // Example format: Aug 29, 2023, 4:30:21 PM

  return (
    <TableRow data-testid={`loc-inventory-movement-row-${movementId}`}>
      <TableCell data-testid={`loc-movement-date-${movementId}`}>
        {formattedDate}
      </TableCell>
      <TableCell data-testid={`loc-movement-ingredient-name-${ingredientId}`}>
        {isLoading ? (
          <Skeleton className="h-4 w-3/4" />
        ) : isError ? (
          <span className="text-red-500">Error loading name</span>
        ) : (
          ingredientData?.name || 'N/A'
        )}
      </TableCell>
      <TableCell data-testid={`loc-movement-type-${movementId}`}>
        {type || 'N/A'}
      </TableCell>
      <TableCell data-testid={`loc-movement-quantity-${movementId}`} className="text-right">
        {quantityChange !== null ? quantityChange : 'N/A'}
      </TableCell>
    </TableRow>
  );
};
