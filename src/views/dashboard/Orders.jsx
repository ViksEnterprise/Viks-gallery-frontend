import { useEffect, useState } from "react";
import { Statistic } from "../../component/dashboard/Statistic";
import { AdminLayout } from "../../layout/AdminLayout";
import { Table } from "../../component/dashboard/Table";
import { BiPound } from "react-icons/bi";
import { OrderDetail } from "../../component/dashboard/OrderDetails";
import { axiosPrivate } from "../../service/axios";
import { Pagination } from "../../component/Pagination";
import { Delete } from "../../component/Delete";

export const DashBoardOrder = () => {
  const [headerData, setHeaderData] = useState([]);
  const [orderResult, setOrderResult] = useState([]);
  const [active, setActive] = useState("table");
  const [id, setID] = useState("");
  const [del, setDel] = useState(false);
  const [paginate, setPaginate] = useState({});
  const [loading, setLoading] = useState(false);
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
    setDel(false);
  };

  const changePage = (page) => {
    // if (page < 1 || page > paginate.last_page) return;
    setCurrentPage(page);
    getOrder(page);
  };

  const getOrder = async (page) => {
    const url = `order/admin/list?page=${page}&page_size=14`;

    try {
      const response = await axiosPrivate.get(url);
      if (response) {
        setOrderResult(response.data?.results.data);
        setHeaderData(response.data?.results.stats);
        setPaginate(response.data?.results.meta);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openDelete = (id) => {
    setID(id);
    setDel(true);
    setActive("table");
  };

  const deleteItem = async (id) => {
    const url = `order/${id}/delete`;
    setLoading(true);
    try {
      const response = await axiosPrivate.delete(url);
      if (response) {
        setDel(false);
        getOrder(currentPage);
      }
    } catch (err) {
      return;
    } finally {
      setLoading(false);
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
              if (column.key === "item_name") {
                return (
                  <span className="flex items-center">
                    <img className="h-7 w-7 rounded-lg me-1" src={row.items[0].item.item?.main_image} alt={row.items[0]?.item?.item?.title} />
                    {row.items.map((item) => item.item.title).join(", ")}
                  </span>
                );
              }
              if (column.key === "item_quantity") {
                return (
                  <span className="flex items-center">
                    {row.items.map((item) => item.item_quantity).reduce((a, b) => a + b, 0)}
                  </span>
                );
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
                      onClick={() => openDetail(row.order_id)}
                    >
                      View
                    </button>

                    {row.status == "delivered" && (
                      <button
                        className="text-red-500 border border-red-400 rounded-lg px-3 py-1"
                        onClick={() => openDelete(row.order_id)}
                      >
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
      {del && (
        <Delete
          title="Order"
          id={id}
          close={closeForm}
          onSubmit={deleteItem}
          open={del}
          loading={loading}
        />
      )}
    </AdminLayout>
  );
};
