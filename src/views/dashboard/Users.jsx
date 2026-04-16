import { useEffect, useState } from "react";
import { Statistic } from "../../component/dashboard/Statistic";
import { AdminLayout } from "../../layout/AdminLayout";
import { Table } from "../../component/dashboard/Table";
import { BiEdit, BiPlus, BiPound, BiTrash } from "react-icons/bi";
import { OrderDetail } from "../../component/dashboard/OrderDetails";
import { axiosPrivate } from "../../service/axios";
import { Pagination } from "../../component/Pagination";
import { Delete } from "../../component/Delete";
import { BsEye } from "react-icons/bs";
import { formatDate, formatTime } from "../../utils/dateTimeFormat";

export const DashBoardUsers = () => {
  const [headerData, setHeaderData] = useState([]);
  const [orderResult, setOrderResult] = useState([]);
  const [active, setActive] = useState("table");
  const [id, setID] = useState("");
  const [del, setDel] = useState(false);
  const [paginate, setPaginate] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const header = [
    { key: "total_users", name: "Total users" },
    { key: "active_users", name: "Active users" },
    { key: "inactive_users", name: "Inactive Users" },
  ];
  const tableHeader = [
    { key: "user", label: "User" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "last_login", label: "Last login" },
    { key: "state", label: "State" },
    { key: "actions", label: "Action" },
  ];

  const openForm = () => {
    setActive("form");
  };

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
    const url = `admin-user-list?page=${page}&page_size=14`;

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

  const editCollection = async (id) => {
    // const url = `artwork/${id}`;
    setMode("edit");
    setActive("form");
    // try {
    //   const response = await axiosPrivate.get(url);
    //   if (response) {
    //     setCollectionResult(response.data?.data);
    //   }
    // } catch (err) {
    //   return;
    // }
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
              <h3 className="text-2xl font-medium">User Management</h3>
              <span className="text-gray-400 text-sm">
                Manage system users and permissions
              </span>
            </div>
            <button
              className="h-11 w-35 bg-blue-700 text-white text-base flex items-center gap-2 justify-center p-3 rounded-lg"
              onClick={openForm}
            >
              <BiPlus size={25} />
              Add User
            </button>
          </div>
          <Statistic subHeaders={header} subData={headerData} />
          <Table headers={tableHeader} data={orderResult}>
            {({ row, column }) => {
              if (column.key === "user") {
                return (
                  <div className="flex gap-2 items-center">
                    <img
                      className="h-8 w-8 border rounded-full"
                      src={row.profile_pic}
                      alt="user image"
                    />
                    <span>{row.full_name}</span>
                  </div>
                );
              }
              if (column.key === "email") {
                return <span className="lowercase">{row.email}</span>;
              }
              if (column.key === "last_login") {
                return (
                  <span className="flex items-center lowercase">
                    {formatDate(row.last_login)} by {formatTime(row.last_login)}
                  </span>
                );
              }
              if (column.key === "actions") {
                return (
                  <div className="flex items-center gap-3">
                    <button
                      className="text-gray-400"
                      onClick={() => openDetail(row.id)}
                    >
                      <BsEye size={18} />
                    </button>
                    <button
                      className="text-blue-700"
                      onClick={() => editCollection(row.id)}
                    >
                      <BiEdit size={18} />
                    </button>

                    <button
                      className="text-red-500"
                      onClick={() => openDelete(row.id)}
                    >
                      <BiTrash size={18} />
                    </button>
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
