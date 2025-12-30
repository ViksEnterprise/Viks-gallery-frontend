import { useEffect, useState } from "react";
import { Statistic } from "../../component/dashboard/Statistic";
import { AdminLayout } from "../../layout/AdminLayout";
import { Table } from "../../component/dashboard/Table";

export const DashBoardOrder = () => {
  const [headerData, setHeaderData] = useState([]);
  const header = [
    { key: "total_orders", name: "Total orders" },
    { key: "paid_orders", name: "Paid orders" },
    { key: "failed_orders", name: "Failed orders" },
  ];
  const tableHeader = [
    { key: "order_id", label: "orders ID" },
    { key: "item_name", label: "Item" },
    { key: "total_amount", label: "Amount paid" },
    { key: "user", label: "Order by" },
    { key: "item_quantity", label: "Quantity" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Action" },
  ];

  return (
    <AdminLayout>
      <div className="grid items-start gap-4">
        <Statistic subHeaders={header} subData={headerData} />
        <Table headers={tableHeader} data={[]} />
      </div>
    </AdminLayout>
  );
};
