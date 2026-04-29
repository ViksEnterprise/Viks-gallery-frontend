import React from "react";

export const Table = ({ headers, data, loading, bar, children }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center z-10">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="w-full rounded-lg bg-white shadow-md p-4 py-2 border border-gray-300">
        <table className="w-full divide-y divide-gray-200">
          {bar && (
            <caption>
              {bar.map((item, i) => (
                <div key={i} className="flex space-x-2 items-center px-3 mb-3">
                  <div
                    className="h-4 w-1 rounded-xl"
                    style={{
                      background: `linear-gradient(to bottom, ${item.from}, ${item.to})`,
                    }}
                  />
                  <span className="text-xs text-[#1E293B]">{item.title}</span>
                </div>
              ))}
            </caption>
          )}

          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="px-6 py-3 text-left text-xs font-semibold capitalize tracking-wider text-[#1E293B]"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, i) => (
              <tr key={row.id || i}>
                {headers.map((header) => (
                  <td
                    key={header.key}
                    className="px-6 py-4 text-sm text-[#121717] capitalize"
                  >
                    {/* Slot equivalent */}
                    {children ? children({ row, column: header }) : row[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="text-center py-4 text-gray-500 w-full">
            No data available.
          </div>
        )}
      </div>
    </div>
  );
};
