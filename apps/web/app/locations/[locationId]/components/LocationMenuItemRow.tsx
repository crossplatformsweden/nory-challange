'use client';

import { FC } from 'react';
import Link from 'next/link';
import { useGetRecipeById } from '@repo/api-client';
import { TableCell, TableRow } from "@repo/ui/components/ui/table";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

interface LocationMenuItemRowProps {
  locationMenuItemId: string; // Assuming this is unique for the row key and testid
  recipeId: string;
  price: number | null;
}

export const LocationMenuItemRow: FC<LocationMenuItemRowProps> = ({
  locationMenuItemId,
  recipeId,
  price,
}) => {
  const { data: recipeData, isLoading, isError } = useGetRecipeById(recipeId);

  return (
    <TableRow data-testid={`menu-item-row-${locationMenuItemId}`}>
      <TableCell data-testid={`menu-item-name-${recipeId}`}>
        {isLoading ? (
          <Skeleton className="h-4 w-3/4" />
        ) : isError ? (
          <span className="text-red-500">Error loading name</span>
        ) : (
          <Link href={`/recipes/${recipeId}`} className="hover:underline text-blue-600">
            {recipeData?.name || 'N/A'}
          </Link>
        )}
      </TableCell>
      <TableCell data-testid={`menu-item-price-${recipeId}`} className="text-right">
        {price !== null ? price.toFixed(2) : 'N/A'}
      </TableCell>
    </TableRow>
  );
};
