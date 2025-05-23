import { useGetIngredientById } from "@repo/api-client";
import { TableCell, TableRow } from "@repo/ui/components/ui/table";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { useEffect } from "react";

interface RecipeIngredientRowProps {
  ingredientId: string;
  quantity: number;
  recipeIngredientLinkId: string;
  onCostUpdate: (
    recipeIngredientLinkId: string,
    cost: number | null,
    isLoading: boolean,
    isError: boolean,
  ) => void;
}

export function RecipeIngredientRow({
  ingredientId,
  quantity,
  recipeIngredientLinkId,
  onCostUpdate,
}: RecipeIngredientRowProps) {
  const {
    data: ingredient,
    isLoading,
    isError,
    error,
  } = useGetIngredientById(ingredientId);

  const costPerUnit = ingredient?.cost;
  const totalIngredientCost =
    costPerUnit !== null && costPerUnit !== undefined && quantity !== null
      ? costPerUnit * quantity
      : null;

  useEffect(() => {
    if (isLoading) {
      onCostUpdate(recipeIngredientLinkId, null, true, false);
    } else if (isError) {
      onCostUpdate(recipeIngredientLinkId, null, false, true);
    } else if (ingredient) {
      // Ensure cost is a number or null before passing
      const finalCostPerUnit = typeof ingredient.cost === 'number' ? ingredient.cost : null;
      const finalTotalIngredientCost = finalCostPerUnit !== null ? finalCostPerUnit * quantity : null;
      onCostUpdate(recipeIngredientLinkId, finalTotalIngredientCost, false, false);
    }
    // Add dependencies that trigger the effect when they change.
  }, [
    ingredient,
    isLoading,
    isError,
    quantity,
    onCostUpdate,
    recipeIngredientLinkId,
    // totalIngredientCost, // totalIngredientCost is derived, so not a direct dep of the effect's *logic*
  ]);

  if (isLoading) {
    return (
      <TableRow data-testid={`recipe-ingredient-row-${recipeIngredientLinkId}`}>
        <TableCell data-testid={`recipe-ingredient-name-${ingredientId}`}>
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="text-right" data-testid={`recipe-ingredient-cost-per-unit-${ingredientId}`}>
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell className="text-right">{quantity}</TableCell> {/* Quantity is known */}
        <TableCell className="text-right" data-testid={`recipe-ingredient-total-cost-${ingredientId}`}>
          <Skeleton className="h-4 w-full" />
        </TableCell>
      </TableRow>
    );
  }

  if (isError) {
    return (
      <TableRow data-testid={`recipe-ingredient-row-${recipeIngredientLinkId}`}>
        <TableCell data-testid={`recipe-ingredient-name-${ingredientId}`}>
          Error
        </TableCell>
        <TableCell className="text-right" data-testid={`recipe-ingredient-cost-per-unit-${ingredientId}`}>
          Error
        </TableCell>
        <TableCell className="text-right">{quantity}</TableCell>
        <TableCell className="text-right" data-testid={`recipe-ingredient-total-cost-${ingredientId}`}>
          Error
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow data-testid={`recipe-ingredient-row-${recipeIngredientLinkId}`}>
      <TableCell data-testid={`recipe-ingredient-name-${ingredientId}`}>
        {ingredient?.name ?? "N/A"}
      </TableCell>
      <TableCell
        className="text-right"
        data-testid={`recipe-ingredient-cost-per-unit-${ingredientId}`}
      >
        {costPerUnit !== null && costPerUnit !== undefined
          ? costPerUnit.toFixed(2)
          : "N/A"}
      </TableCell>
      <TableCell className="text-right">{quantity ?? "N/A"}</TableCell>
      <TableCell
        className="text-right"
        data-testid={`recipe-ingredient-total-cost-${ingredientId}`}
      >
        {totalIngredientCost !== null
          ? totalIngredientCost.toFixed(2)
          : "N/A"}
      </TableCell>
    </TableRow>
  );
}
