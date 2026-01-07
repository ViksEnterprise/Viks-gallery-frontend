import { useEffect, useState } from "react";
import { Statistic } from "../../component/dashboard/Statistic";
import { AdminLayout } from "../../layout/AdminLayout";
import { Table } from "../../component/dashboard/Table";
import { ShipmentUpdateForm } from "../../component/dashboard/ShipmentUpdate";

export const Shipment = () => {
  const [headerData, setHeaderData] = useState([
    { shipment_id: 120, item_name: "Ang", status: "processing" },
  ]);
  const [openCreate, setOpenCreate] = useState(false);
  const header = [
    { key: "total_deliveries", name: "Total deliveries" },
    { key: "successful_deliveries", name: "Successful deliveries" },
    { key: "pending_deliveries", name: "Pending deliveries" },
  ];
  const tableHeader = [
    { key: "shipment_id", label: "Shipment ID" },
    { key: "order_id", label: "Order ID" },
    { key: "item_name", label: "Goods" },
    { key: "shipping_company", label: "Shipped By" },
    { key: "tracking_id", label: "Tracking ID" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Action" },
  ];

  const performAction = (id) => {
    const state = headerData.find((i) => i.shipment_id === id);
    if (state.status == "processing") {
      setOpenCreate(true);
    }
  };

  const closeForm = () => {
    setOpenCreate(false);
  };

  return (
    <AdminLayout>
      {!openCreate ? (
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
          <Table headers={tableHeader} data={headerData}>
            {({ row, column }) => {
              if (column.key === "actions") {
                return (
                  <div className="flex items-center gap-3">
                    <button className="border border-gray-400 rounded-lg px-3 py-2">
                      View
                    </button>
                    {row.status == "processing" ||
                    row.status == "in-transit" ? (
                      <button
                        onClick={() => performAction(row.shipment_id)}
                        className="bg-blue-700 text-white rounded-lg px-3 py-2"
                      >
                        {row.status == "processing" && "Ready to ship"}
                        {row.status == "in-transit" && "Mark as delivered"}
                      </button>
                    ) : null}
                    {row.status == "delivered" && (
                      <button className="border border-red-500 text-red-500 rounded-lg px-3 py-2">
                        Delete
                      </button>
                    )}
                  </div>
                );
              }

              if (column.key === "status") {
                return (
                  <span
                    className={
                      row.status == "processing"
                        ? "bg-yellow-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                        : row.status == "in-transit"
                        ? "bg-orange-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                        : row.status == "delivered"
                        ? "bg-green-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                        : row.status == "refunded"
                        ? "bg-slate-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
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
      ) : (
        <ShipmentUpdateForm open={openCreate} close={closeForm} />
      )}
    </AdminLayout>
  );
};
