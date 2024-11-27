"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import DataTable from "./data-table";

export default function Home() {
 
  const [orders,setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5069/api/orders");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const orders = await response.json();
        console.log(orders);
        setOrders(orders);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchOrders();
  }, []);

  
  return (
    <div className="container mx-auto py-10 w-[80%]">
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
