import { useEffect, useState } from "react";
import { Statistic } from "../../component/dashboard/Statistic";
import { AdminLayout } from "../../layout/AdminLayout";
import { Table } from "../../component/dashboard/Table";
import { BiPound } from "react-icons/bi";
import { OrderDetail } from "../../component/dashboard/OrderDetails";
import { axiosPrivate } from "../../service/axios";
import { Pagination } from "../../component/Pagination";

export const DashBoardOrder = () => {
  const [headerData, setHeaderData] = useState([]);
  const [orderResult, setOrderResult] = useState([]);
  const [active, setActive] = useState("table");
  const [id, setID] = useState("");
  const [paginate, setPaginate] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
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

  const openDetail = (id) => {
    setActive("detail");
    setID(id);
  };

  const closeForm = () => {
    setActive("table");
  };

  const changePage = (page) => {
    if (page < 1 || page > pagination.last_page) return;
    setCurrentPage(page);
    getOrder(page);
  };

  const getOrder = async (page) => {
    const url = `order/admin/list?page=${page}&page_size=14`;

    try {
      const response = await axiosPrivate.get(url);
      if (response) {
        setOrderResult(response.data?.data);
        setHeaderData(response.data?.stats);
        setPaginate(response.data?.meta);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setActive("table");
    getOrder(currentPage);
  }, []);

  return (
    <AdminLayout>
      {active == "table" && (
        <div className="grid items-start gap-4">
          <div className="w-full flex items-center justify-between">
            <div className="w-fit grid space-y-2">
              <h3 className="text-2xl font-medium">Orders Management</h3>
              <span className="text-gray-400 text-sm">
                Manage and keep track of orders
              </span>
            </div>
          </div>
          <Statistic subHeaders={header} subData={headerData} />
          <Table headers={tableHeader} data={orderResult}>
            {({ row, column }) => {
              if (column.key === "user") {
                return <span>{row.user?.full_name}</span>;
              }
              if (column.key === "total_amount") {
                return (
                  <span className="flex items-center">
                    <BiPound /> {row.total_amount}
                  </span>
                );
              }
              if (column.key === "actions") {
                return (
                  <div className="flex items-center gap-3">
                    <button
                      className="border border-gray-400 rounded-lg px-3 py-1"
                      onClick={() => openDetail(row.id)}
                    >
                      View
                    </button>

                    {row.status == "delivered" && (
                      <button className="text-red-500 border border-red-400 rounded-lg px-3 py-1">
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
                      row.status == "failed"
                        ? "bg-red-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                        : row.status == "paid" || row.status == "delivered"
                        ? "bg-green-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                        : row.status == "pending"
                        ? "bg-yellow-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                        : "bg-orange-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                    }
                  >
                    {row.status}
                  </span>
                );
              }

              return row[column.key];
            }}
          </Table>
          <Pagination meta={paginate} onPageChange={changePage} />
        </div>
      )}
      {active == "detail" && (
        <OrderDetail open={active} close={closeForm} id={id} />
      )}
    </AdminLayout>
  );
};
