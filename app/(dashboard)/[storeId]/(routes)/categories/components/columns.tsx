'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type CategoryColumn = {
    id: string;
    name: string;
    billboardLabel: string;
    createdAt: string;
    updatedAt: Date;
};

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'billboard',
        header: 'Billboard',
        cell: ({row}) => row.original.billboardLabel,
    },
    {
        accessorKey: 'createdAt',
        header: 'Created',
    },
    {
        accessorKey: 'updatedAt',
        header: 'Last updated',
      },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
        header: 'Actions',
    },
];
