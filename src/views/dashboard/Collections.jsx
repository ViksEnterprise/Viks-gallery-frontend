import { useCallback, useEffect, useState } from "react";
import { Statistic } from "../../component/dashboard/Statistic";
import { AdminLayout } from "../../layout/AdminLayout";
import { Table } from "../../component/dashboard/Table";
import { FaSearch } from "react-icons/fa";
import { CollectionCreate } from "../../component/dashboard/CollectionCreate";

export const DashBoardCollection = () => {
  const [statHeader, setStatHeader] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [type, setType] = useState("artwork");
  const [search, setSearch] = useState("");
  const [tableHeading, setTableHeading] = useState([]);
  const btnType = ["artwork", "sculpture", "beads"];
  const header = [
    {
      type: "artwork",
      value: [
        { key: "total_artwork", name: "Total artwork" },
        { key: "sold_artwork", name: "Sold artwork" },
        { key: "remaining_artwork", name: "Remaining artwork" },
      ],
    },
    {
      type: "sculpture",
      value: [
        { key: "total_sculpture", name: "Total sculpture" },
        { key: "sold_sculpture", name: "Sold sculpture" },
        { key: "remaining_sculpture", name: "Remaining sculpture" },
      ],
    },
    {
      type: "beads",
      value: [
        { key: "total_beads", name: "Total beads" },
        { key: "sold_beads", name: "Sold beads" },
        { key: "remaining_beads", name: "Remaining beads" },
      ],
    },
  ];
  const tableHeader = [
    {
      type: "artwork",
      value: [
        { key: "artworkId", label: "Artwork ID" },
        { key: "artwork_title", label: "Artwork name" },
        { key: "price", label: "Price" },
        { key: "artist_name", label: "Artist" },
        { key: "quantity", label: "Quantity" },
        { key: "product_status", label: "Status" },
        { key: "actions", label: "Action" },
      ],
    },
    {
      type: "sculpture",
      value: [
        { key: "id", label: "Sculpture ID" },
        { key: "name", label: "Name" },
        { key: "price", label: "Price" },
        { key: "artist_name", label: "Artist" },
        { key: "quantity", label: "Quantity" },
        { key: "product_status", label: "Status" },
        { key: "actions", label: "Action" },
      ],
    },
    {
      type: "beads",
      value: [
        { key: "id", label: "Product ID" },
        { key: "name", label: "Name" },
        { key: "price", label: "Price" },
        { key: "designer_name", label: "Designer name" },
        { key: "quantity", label: "Quantity" },
        { key: "product_status", label: "Status" },
        { key: "actions", label: "Action" },
      ],
    },
  ];

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    debounceSearch(value);
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
    // debounce((value) => getArtwork(value), 200),
    []
  );

  const getType = (val) => {
    setType(val);
    getTableHeadingBaseOnType(val);
  };

  const getTableHeadingBaseOnType = (val) => {
    const statVal = header.find((con) => con.type === val);
    const valContent = tableHeader.find((item) => item.type === val);
    setStatHeader(statVal.value);
    setTableHeading(valContent.value);
  };

  useEffect(() => {
    getTableHeadingBaseOnType(type);
  }, []);

  return (
    <AdminLayout>
      <div className="grid items-start gap-4">
        <Statistic subHeaders={statHeader} subData={headerData} />
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
          <div className="h-11 flex items-center border-gray-300 border-solid border-[1px] rounded-[7px] gap-2 px-2 overflow-hidden w-96">
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
        <Table headers={tableHeading} data={[]} />
      </div>

      <CollectionCreate />
    </AdminLayout>
  );
};
