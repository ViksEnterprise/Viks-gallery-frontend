import { useEffect, useState } from "react";
import { Statistic } from "../../component/dashboard/Statistic";
import { AdminLayout } from "../../layout/AdminLayout";
import { Table } from "../../component/dashboard/Table";
import { ShipmentUpdateForm } from "../../component/dashboard/ShipmentUpdate";

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
    { key: "shipping_company", label: "Shipped By" },
    { key: "tracking_id", label: "Tracking ID" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Action" },
  ];

  return (
    <AdminLayout>
      <div className="grid items-start gap-4">
        <div className="w-full flex items-center justify-between">
          <div className="w-fit grid space-y-2">
            <h3 className="text-2xl font-medium">Shipments Management</h3>
            <span className="text-gray-400 text-sm">
              Manage deliveries and product shipment
            </span>
          </div>
        </div>
        <Statistic subHeaders={header} subData={headerData} />
        <Table
          headers={tableHeader}
          data={[{ id: 120, item_name: "Ang", status: "processing" }]}
        >
          {({ row, column }) => {
            if (column.key === "actions") {
              return <button>Edit {row.status}</button>;
            }

            if (column.key === "status") {
              return (
                <span
                  className={
                    row.status == "pending"
                      ? "bg-yellow-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                      : row.status == "processing"
                      ? "bg-orange-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                      : ""
                  }
                >
                  {row.status}
                </span>
              );
            }

            return row[column.key];
          }}
        </Table>
      </div>
      <ShipmentUpdateForm />
    </AdminLayout>
  );
};
