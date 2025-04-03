import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@radix-ui/themes';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowsUpDownIcon,
} from '@radix-ui/react-icons';

export interface Column<T> {
  key: string;
  header: string;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyState?: React.ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  sortColumn,
  sortDirection,
  onSort,
  onRowClick,
  loading,
  emptyState,
}: DataTableProps<T>) {
  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;
    if (column.key !== sortColumn) return <ArrowsUpDownIcon />;
    return sortDirection === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />;
  };

  const handleHeaderClick = (column: Column<T>) => {
    if (column.sortable && onSort) {
      onSort(column.key);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        Loading...
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return <div className="p-4">{emptyState}</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.key}
              style={{ width: column.width }}
              onClick={() => handleHeaderClick(column)}
              className={column.sortable ? 'cursor-pointer hover:bg-gray-50' : ''}
            >
              <div className="flex items-center gap-1">
                {column.header}
                {renderSortIcon(column)}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            onClick={() => onRowClick?.(row)}
            className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
          >
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.cell ? column.cell(row) : (row as any)[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 