import { useCallback, useEffect, useState } from "react";
import { Statistic } from "../../component/dashboard/Statistic";
import { AdminLayout } from "../../layout/AdminLayout";
import { Table } from "../../component/dashboard/Table";
import { FaSearch } from "react-icons/fa";
import { CollectionCreate } from "../../component/dashboard/CollectionCreate";
import { BiEdit, BiPlus, BiPound, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { axiosPrivate } from "../../service/axios";
import { CollectionDetail } from "../../component/dashboard/CollectionDetail";
import { Pagination } from "../../component/Pagination";
import { Delete } from "../../component/Delete";

export const DashBoardCollection = () => {
  const [statHeader, setStatHeader] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [statVal, setStatVal] = useState([]);
  const [type, setType] = useState("artwork");
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableHeading, setTableHeading] = useState([]);
  const [paginate, setPaginate] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [collectionResult, setCollectionResult] = useState([]);
  const [active, setActive] = useState("table");
  const [id, setID] = useState("");
  const [del, setDel] = useState(false);
  const btnType = ["artwork", "sculpture", "beads"];
  const header = [
    {
      type: "artwork",
      value: [
        { key: "total", name: "Total artwork" },
        { key: "sold", name: "Sold artwork" },
        { key: "remaining", name: "Remaining artwork" },
      ],
    },
    {
      type: "sculpture",
      value: [
        { key: "total", name: "Total sculpture" },
        { key: "sold", name: "Sold sculpture" },
        { key: "remaining", name: "Remaining sculpture" },
      ],
    },
    {
      type: "beads",
      value: [
        { key: "total", name: "Total beads" },
        { key: "sold", name: "Sold beads" },
        { key: "remaining", name: "Remaining beads" },
      ],
    },
  ];
  const tableHeader = [
    {
      type: "artwork",
      value: [
        { key: "id", label: "Artwork ID" },
        { key: "title", label: "Artwork name" },
        { key: "price", label: "Price" },
        { key: "artist_name", label: "Artist" },
        { key: "quantity", label: "Quantity" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Action" },
      ],
    },
    {
      type: "sculpture",
      value: [
        { key: "id", label: "Sculpture ID" },
        { key: "title", label: "Name" },
        { key: "price", label: "Price" },
        { key: "artist_name", label: "Artist" },
        { key: "quantity", label: "Quantity" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Action" },
      ],
    },
    {
      type: "beads",
      value: [
        { key: "id", label: "Product ID" },
        { key: "title", label: "Name" },
        { key: "price", label: "Price" },
        { key: "designer_name", label: "Designer name" },
        { key: "quantity", label: "Quantity" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Action" },
      ],
    },
  ];

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    debounceSearch(value);
  };

  const changePage = (page) => {
    if (page < 1 || page > pagination.last_page) return;
    setCurrentPage(page);
    getArtwork(type, page);
  };

  const openForm = () => {
    setActive("form");
  };

  const openDetail = (id) => {
    setActive("detail");
    setMode("create");
    setID(id);
  };

  const closeForm = () => {
    setActive("table");
    setMode("create");
    setDel(false);
  };

  function debounce(func, timer) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, timer);
    };
  }

  const debounceSearch = useCallback(
    debounce((value) => getArtwork(type, currentPage, value), 180),
    []
  );

  const getType = (val) => {
    setType(val);
    getTableHeadingBaseOnType(val);
    getArtwork(val, currentPage, search);
  };

  const getTableHeadingBaseOnType = (val) => {
    const statVal = header.find((con) => con.type === val);
    const valContent = tableHeader.find((item) => item.type === val);
    setStatHeader(statVal.value);
    setTableHeading(valContent.value);
  };

  const getArtwork = async (val, page, search) => {
    const url = `artwork/admin/list?artType=${val}&page=${page}&page_size=14${
      search && `&search=${search}`
    }`;

    try {
      const response = await axiosPrivate.get(url);
      if (response) {
        setHeaderData(response.data?.results.data);
        setStatVal(response.data?.results.stats);
        setPaginate(response.data?.results.meta);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setLoading(false);
    }
  };

  const postArtwork = async (data) => {
    const url = `artwork/upload/`;
    setLoading(true);
    try {
      const response = await axiosPrivate.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        setActive("table");
        setMode("create");
        getArtwork(type);
      }
    } catch (err) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const updateArtwork = async (id, data) => {
    const url = `artwork/${id}/update`;
    setLoading(true);
    try {
      const response = await axiosPrivate.patch(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        setActive("table");
        setMode("create");
        getArtwork(type);
      }
    } catch (err) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const editCollection = async (id) => {
    const url = `artwork/${id}`;
    setMode("edit");
    setActive("form");
    try {
      const response = await axiosPrivate.get(url);
      if (response) {
        setCollectionResult(response.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  const openDelete = (id) => {
    setID(id);
    setDel(true);
    setActive("table");
  };

  const deleteItem = async (id) => {
    const url = `artwork/${id}/delete`;
    setLoading(true);
    try {
      const response = await axiosPrivate.delete(url);
      if (response) {
        setDel(false);
        getArtwork(type, currentPage, search);
      }
    } catch (err) {
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setActive("table");
    setMode("create");
    getTableHeadingBaseOnType(type);
    getArtwork(type, currentPage, search);
  }, []);

  return (
    <AdminLayout>
      {active == "table" && (
        <div className="grid items-start gap-5">
          <div className="w-full flex items-center justify-between">
            <div className="w-fit grid space-y-2">
              <h3 className="text-2xl font-medium">Collections Management</h3>
              <span className="text-gray-400 text-sm">
                Manage artworks, sculpture and beads collection
              </span>
            </div>
            <button
              className="h-11 w-35 bg-blue-700 text-white text-base flex items-center gap-2 justify-center p-3 rounded-lg"
              onClick={openForm}
            >
              <BiPlus size={25} />
              Create Collection
            </button>
          </div>
          <Statistic subHeaders={statHeader} subData={statVal} />
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-3 text-base">
              {btnType.map((val, i) => (
                <button
                  className={
                    type == val
                      ? "h-fit w-fit border-none outline-none text-blue-700 capitalize"
                      : "h-fit w-fit border-none outline-none text-gray-400 capitalize"
                  }
                  key={i}
                  onClick={() => getType(val)}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="h-11 flex items-center border-gray-300 border-solid border-[1px] rounded-[7px] gap-2 px-2 overflow-hidden w-96 bg-white">
              <FaSearch className="text-[14px] text-gray-400 font-normal" />
              <input
                className="h-full border-none outline-[transparent]"
                type="text"
                placeholder="search by name"
                name="search"
                value={search}
                onChange={handleChange}
              />
            </div>
          </div>
          <Table headers={tableHeading} data={headerData}>
            {({ row, column }) => {
              if (column.key === "artist_name") {
                return (
                  <span>
                    {row.artworkDetails?.artist_name ||
                      row.sculptureDetails?.artist_name}
                  </span>
                );
              }

              if (column.key === "price") {
                return (
                  <span className="flex items-center">
                    <BiPound /> {row.price}
                  </span>
                );
              }

              if (column.key === "designer_name") {
                return <span>{row.beadsDetails?.designer_name}</span>;
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
                      row.status == "almost_out"
                        ? "bg-red-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                        : row.status == "available"
                        ? "bg-green-500 py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                        : row.status == "out"
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
          <Pagination meta={paginate} onPageChange={changePage} />
        </div>
      )}
      {active == "form" && (
        <CollectionCreate
          mode={mode}
          open={active}
          initialData={collectionResult}
          loading={loading}
          close={closeForm}
          onSubmit={(payload) => {
            mode === "edit"
              ? updateArtwork(collectionResult?.id, payload)
              : postArtwork(payload);
          }}
        />
      )}

      {active == "detail" && (
        <CollectionDetail open={active} close={closeForm} id={id} />
      )}

      {del && (
        <Delete
          title={type}
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
