'use client';

import { FC } from 'react';
import { useListStaff } from '@repo/api-client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert";
import { Terminal } from "lucide-react";

interface StaffListProps {
  locationId: string;
}

export const StaffList: FC<StaffListProps> = ({ locationId }) => {
  const { data: staffData, isLoading, isError, error } = useListStaff({ queryParams: { locationId } });

  if (isLoading) {
    return (
      <div data-testid="staff-list-loading" className="space-y-2">
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
      <Alert variant="destructive" data-testid="staff-list-error">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error Loading Staff</AlertTitle>
        <AlertDescription>
          {error?.message || "An unexpected error occurred."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!staffData || staffData.length === 0) {
    return <p data-testid="staff-list-empty">No staff members found for this location.</p>;
  }

  return (
    <div data-testid="staff-list-container">
      <h3 className="text-lg font-semibold mb-2" data-testid="staff-list-title">Staff Members</h3>
      <Table data-testid="staff-list-table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            {/* Add more headers if needed, e.g., Email, Phone */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffData.map((staff) => (
            <TableRow key={staff.id} data-testid={`staff-row-${staff.id}`}>
              <TableCell data-testid={`staff-name-${staff.id}`}>{staff.name || 'N/A'}</TableCell>
              <TableCell data-testid={`staff-role-${staff.id}`}>{staff.role || 'N/A'}</TableCell>
              {/* Add more cells if needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
