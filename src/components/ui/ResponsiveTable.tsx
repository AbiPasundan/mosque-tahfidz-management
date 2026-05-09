import { cn } from '@/utils/cn';
import { flexRender, type Table } from '@tanstack/react-table';
import { LuArrowUpDown } from 'react-icons/lu';
import type { Student } from '@/constants/mockData';
import { StudentStatusBadge } from '@/features/students/components/StudentStatusBadge';
import { Link } from 'react-router';

interface ResponsiveTableProps<T> {
  table: Table<T>;
  mobileCardRender?: (row: T) => React.ReactNode;
}

export function ResponsiveTable<T extends { id: string }>({
  table,
  mobileCardRender,
}: ResponsiveTableProps<T>) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-outline-variant bg-surface-container-low"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left p-md text-label-sm text-on-surface-variant font-medium cursor-pointer select-none min-h-[52px]"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-sm">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && <LuArrowUpDown className="w-3 h-3" />}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-outline-variant hover:bg-surface-container transition-colors min-h-[52px]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-md">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-sm">
        {table.getRowModel().rows.map((row) => {
          const student = row.original as unknown as Student;
          return (
            <div
              key={row.id}
              className="bg-surface-container-lowest rounded-lg border border-outline-variant p-md"
            >
              {mobileCardRender ? (
                mobileCardRender(row.original)
              ) : (
                <div className="space-y-sm">
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/students/${student.id}`}
                      className="text-body-md font-medium text-primary hover:underline"
                    >
                      {student.name}
                    </Link>
                    <StudentStatusBadge status={student.status} />
                  </div>
                  <div className="flex justify-between text-label-sm text-on-surface-variant">
                    <span>NIS: {student.nis}</span>
                    <span>{student.class}</span>
                  </div>
                  <div className="text-label-sm text-on-surface-variant">
                    {student.memorization}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
