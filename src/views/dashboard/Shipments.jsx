import { useEffect, useState } from "react";
import { Statistic } from "../../component/dashboard/Statistic";
import { AdminLayout } from "../../layout/AdminLayout";
import { Table } from "../../component/dashboard/Table";
import { ShipmentUpdateForm } from "../../component/dashboard/ShipmentUpdate";
import { ShipmentDetail } from "../../component/dashboard/ShipmentDetails";
import axios, { axiosPrivate } from "../../service/axios";

export const Shipment = () => {
  const [headerData, setHeaderData] = useState([]);
  const [active, setActive] = useState("table");
  const [id, setID] = useState("");
  const [headerStat, setHeaderStat] = useState("");
  const [loading, setLoading] = useState(false);
  const header = [
    { key: "total_deliveries", name: "Total deliveries" },
    { key: "successful_deliveries", name: "Successful deliveries" },
    { key: "pending_deliveries", name: "Pending deliveries" },
  ];
  const tableHeader = [
    { key: "shipment_id", label: "Shipment ID" },
    { key: "order_id", label: "Order ID" },
    { key: "item_name", label: "Goods" },
    { key: "courier", label: "Shipped By" },
    { key: "tracking_id", label: "Tracking ID" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Action" },
  ];

  const getShipment = async () => {
    const url = `payments/admin/shipments`;

    try {
      const response = await axios.get(url);
      if (response) {
        setHeaderData(response.data?.data);
        setHeaderStat(response.data?.stats);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const performAction = async (id) => {
    const state = headerData.find((i) => i.shipment_id === id);
    if (state.status == "processing") {
      setActive("form");
    }

    if (state.status == "in-transit") {
      const url = `payments/${id}/admin/shipments/update`;
      let payload = {
        status: "delivered",
      };
      try {
        const response = await axiosPrivate.patch(url, payload);
        if (response) {
          getShipment();
          return;
        }
      } catch (err) {
        return;
      }
    }
  };

  const postShipment = async (data, id) => {
    const url = `payments/${id}/admin/shipments/update`;
    setLoading(true);
    let payload = {
      ...data,
      status: "in-transit",
    };
    try {
      const response = await axiosPrivate.patch(url, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        setActive("table");
        getShipment();
        return;
      }
    } catch (err) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const openDetail = (id) => {
    setActive("detail");
    setID(id);
  };

  const closeForm = () => {
    setActive("table");
  };

  useEffect(() => {
    getShipment();
  }, []);

  return (
    <AdminLayout>
      {active == "table" && (
        <div className="grid items-start gap-4">
          <div className="w-full flex items-center justify-between">
            <div className="w-fit grid space-y-2">
              <h3 className="text-2xl font-medium">Shipments Management</h3>
              <span className="text-gray-400 text-sm">
                Manage deliveries and product shipment
              </span>
            </div>
          </div>
          <Statistic subHeaders={header} subData={headerStat} />
          <Table headers={tableHeader} data={headerData}>
            {({ row, column }) => {
              if (column.key === "actions") {
                return (
                  <div className="flex items-center gap-3">
                    <button
                      className="border border-gray-400 rounded-lg px-3 py-2 h-9"
                      onClick={() => openDetail(row.shipment_id)}
                    >
                      View
                    </button>
                    {row.status == "processing" ||
                    row.status == "in-transit" ? (
                      <button
                        onClick={() => performAction(row.shipment_id)}
                        className="bg-blue-700 text-white rounded-lg px-3 py-2 w-[10em] h-9"
                      >
                        {row.status == "processing" && "Ready to ship"}
                        {row.status == "in-transit" && "Mark as delivered"}
                      </button>
                    ) : null}
                    {row.status == "delivered" && (
                      <button className="border border-red-500 text-red-500 rounded-lg px-3 py-2 h-9">
                        Delete
                      </button>
                    )}
                  </div>
                );
              }

              if (column.key === "order_id") {
                return (
                  <span className="font-[400]">{row?.order.order_id}</span>
                );
              }

              if (column.key === "item_name") {
                return (
                  <div className="h-10 w-16 object-cover border rounded-lg overflow-hidden">
                    <img
                      className="h-auto w-full"
                      src={row.order?.item_name.main_image}
                      alt="product images"
                    />
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
                        ? "bg-orange-500 py-1 px-1 w-24 flex items-center justify-center font-normal text-xs text-white rounded-xl"
                        : row.status == "delivered"
                        ? "bg-green-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                        : row.status == "refunded"
                        ? "bg-slate-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                        : "w-96"
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
      )}
      {active == "form" && (
        <ShipmentUpdateForm
          open={active}
          close={closeForm}
          loading={loading}
          onSubmit={postShipment}
          orderId={id}
        />
      )}
      {active == "detail" && (
        <ShipmentDetail id={id} open={active} close={closeForm} />
      )}
    </AdminLayout>
  );
};
