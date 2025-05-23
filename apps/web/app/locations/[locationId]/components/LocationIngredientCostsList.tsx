'use client';

import { FC } from 'react';
import { useListLocationIngredientCosts } from '@repo/api-client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert";
import { Terminal } from "lucide-react";
import { LocationIngredientCostRow } from './LocationIngredientCostRow'; // Import the row sub-component

interface LocationIngredientCostsListProps {
  locationId: string;
}

export const LocationIngredientCostsList: FC<LocationIngredientCostsListProps> = ({ locationId }) => {
  const { data: ingredientCostsData, isLoading, isError, error } = useListLocationIngredientCosts({ queryParams: { locationId } });

  if (isLoading) {
    return (
      <div data-testid="loc-ingredient-costs-list-loading" className="space-y-2">
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
      <Alert variant="destructive" data-testid="loc-ingredient-costs-list-error">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error Loading Ingredient Costs</AlertTitle>
        <AlertDescription>
          {error?.message || "An unexpected error occurred."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!ingredientCostsData || ingredientCostsData.length === 0) {
    return <p data-testid="loc-ingredient-costs-list-empty">No specific ingredient costs found for this location.</p>;
  }

  return (
    <div data-testid="loc-ingredient-costs-list-container">
      <h3 className="text-lg font-semibold mb-2" data-testid="loc-ingredient-costs-list-title">Location-Specific Ingredient Costs</h3>
      <Table data-testid="loc-ingredient-costs-table">
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient Name</TableHead>
            <TableHead className="text-right">Cost Per Unit</TableHead>
            <TableHead className="text-right">Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredientCostsData.map((item) => (
            <LocationIngredientCostRow
              key={item.id} // Assuming LocationIngredientCost has an 'id' field
              locationIngredientCostId={item.id!} // Pass the unique ID
              ingredientId={item.ingredientId!} // Assert non-null as it's required
              costPerUnit={item.cost !== undefined ? item.cost : null} // Handle cost potentially being undefined
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
