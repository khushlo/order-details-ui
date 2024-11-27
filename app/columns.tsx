"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  orderID: number
  customerID: number
  orderDate: Date
  orderTotal: number
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderID",
    header: "Order Id",
  },
  {
    accessorKey: "customerID",
    header: "Customer Id",
  },
  {
    accessorKey: "orderDate",
    header:({column}) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Order Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )
    },
    cell:({row}) => {
      const dateFormatted = new Intl.DateTimeFormat("en-US").format(new Date(row.getValue("orderDate")))
      return <div>{dateFormatted}</div>
    }
  },
  {
    accessorKey: "orderTotal",
    header: ({column}) => {
      return(
        <div className="text-right">
        <Button 
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Amount <ArrowUpDown className="h-4 w-4" />
        </Button>
        </div>
      )
    },    
    cell:({row}) => {
      const amount = parseFloat(row.getValue("orderTotal"))
      const formatted = new Intl.NumberFormat("en-US", {
        style:"currency",
        currency:"USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    }
  }
]
