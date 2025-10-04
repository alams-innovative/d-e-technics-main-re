"use client"

import * as React from "react"
import { type Table } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">View</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table.getAllLeafColumns().map((column) => {
          const isHidden = !column.getIsVisible()
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={!isHidden}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
