import React from "react";

export interface Column<T> {
  header: string;
  accessorKey: keyof T | ((item: T) => React.ReactNode);
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function DataTable<T extends { id: string }>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-950 text-xs uppercase text-slate-400 border-b border-slate-800">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3 font-semibold tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-500">
                No records found.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-850/60 transition-colors">
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-4">
                    {typeof col.accessorKey === "function"
                      ? col.accessorKey(item)
                      : String(item[col.accessorKey] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
