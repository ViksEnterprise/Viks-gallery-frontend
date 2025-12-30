import { useEffect, useState } from "react";
import { Statistic } from "../../component/dashboard/Statistic";
import { AdminLayout } from "../../layout/AdminLayout";
import { Table } from "../../component/dashboard/Table";

export const Shipment = () => {
  const [headerData, setHeaderData] = useState([]);
  const header = [
    { key: "total_deliveries", name: "Total deliveries" },
    { key: "successful_deliveries", name: "Successful deliveries" },
    { key: "pending_deliveries", name: "Pending deliveries" },
  ];
  const tableHeader = [
    { key: "id", label: "Shipment ID" },
    { key: "item_name", label: "Goods" },
    { key: "location", label: "Current location" },
    { key: "shipping_company", label: "Shipped By" },
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
