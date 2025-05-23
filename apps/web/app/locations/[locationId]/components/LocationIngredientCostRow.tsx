'use client';

import { FC } from 'react';
import { useGetIngredientById } from '@repo/api-client';
import { TableCell, TableRow } from "@repo/ui/components/ui/table";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

interface LocationIngredientCostRowProps {
  locationIngredientCostId: string; // Unique ID for the row key and testid
  ingredientId: string;
  costPerUnit: number | null;
}

export const LocationIngredientCostRow: FC<LocationIngredientCostRowProps> = ({
  locationIngredientCostId,
  ingredientId,
  costPerUnit,
}) => {
  const { data: ingredientData, isLoading, isError } = useGetIngredientById(ingredientId);

  return (
    <TableRow data-testid={`loc-ingredient-cost-row-${locationIngredientCostId}`}>
      <TableCell data-testid={`loc-ingredient-name-${ingredientId}`}>
        {isLoading ? (
          <Skeleton className="h-4 w-3/4" />
        ) : isError ? (
          <span className="text-red-500">Error loading name</span>
        ) : (
          ingredientData?.name || 'N/A'
        )}
      </TableCell>
      <TableCell data-testid={`loc-ingredient-cost-${ingredientId}`} className="text-right">
        {costPerUnit !== null ? costPerUnit.toFixed(2) : 'N/A'}
      </TableCell>
      <TableCell data-testid={`loc-ingredient-unit-${ingredientId}`} className="text-right">
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
