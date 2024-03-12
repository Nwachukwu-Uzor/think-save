"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";
import { Button, DebouncedInput, Pagination } from ".";
import { fuzzyFilter } from "@/utils/table";
import { MdDownload } from "react-icons/md";

type Props<T> = {
  data: any[];
  columns: ColumnDef<T, any>[];
  searchPosition?: "left" | "right";
  isDownloadable?: boolean;
  fileTitle?: string;
};
export function Table({
  data,
  columns,
  searchPosition = "left",
  isDownloadable,
  fileTitle,
}: Props<any>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const {
    getHeaderGroups,
    getRowModel,
    setPageIndex,
    getCanNextPage,
    getCanPreviousPage,
    previousPage,
    nextPage,
    getState,
    getPageCount,
    setPageSize,
  } = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const safeValue = (() => {
        const value = row.getValue(columnId);
        return typeof value === "number" ? String(value) : value;
      })() as string;

      return safeValue?.toLowerCase().includes(filterValue.toLowerCase());
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const handleDownload = async () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const excelBlob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const fileName = `${fileTitle ?? "report"}-${new Date()
        .getTime()
        .toString()}`;

      if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
        // For IE browser
        (window.navigator as any).msSaveOrOpenBlob(excelBlob, fileName);
      } else {
        // For other modern browsers
        const url = URL.createObjectURL(excelBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className={`p-2 flex ${
          searchPosition === "left" ? "justify-start" : "justify-end"
        }`}
      >
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search..."
        />
      </div>
      <div className="overflow-auto">
        <table className="table w-full whitespace-nowrap">
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="text-left last:text-right"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className={`text-left last:text-right`}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <div className="flex items-center gap-2 ">
          <button
            className="border rounded p-1"
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            {"<"}
          </button>
          <Pagination
            totalPages={getPageCount()}
            currentPage={getState().pagination.pageIndex + 1}
            handlePageClick={(page: number) => setPageIndex(page - 1)}
          />
          <button
            className="border rounded p-1"
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
          >
            {">"}
          </button>
          <select
            value={getState().pagination.pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className="bg-accent-blue py-1.5 px-8 border-none outline-none focus:border-none focus:outline-none focus:ring-[0.5px] focus:ring-main-blue rounded-md duration-50 placeholder:opacity-70 placeholder:text-xs "
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        {isDownloadable && (
          <div>
            <Button color="black" onClick={handleDownload}>
              <MdDownload /> Download
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
