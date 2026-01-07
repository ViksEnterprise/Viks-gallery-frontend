export const Statistic = ({ subHeaders, subData = [], bar }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-2 items-center w-full capitalize">
      {subHeaders.map((val, i) => (
        <div
          key={i}
          className="w-full h-fit flex flex-col space-y-4 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer"
          style={{
            background: val.bgFrom
              ? `linear-gradient(to right, ${val.bgFrom}, ${val.bgTo})`
              : "white",
          }}
          onClick={() => getHeaderKey(val.key)}
        >
          <span className="text-base" style={{ color: val.textC }}>
            {val.name}
          </span>

          <span
            className="font-semibold text-xl"
            style={{ color: val.subTextC }}
          >
            {subData?.[val.key]}
          </span>

          {bar && (
            <div
              className="w-full rounded-md h-2 relative overflow-hidden"
              style={{
                background: val.beforeBg,
              }}
            >
              <div
                className="absolute h-full rounded-md"
                style={{
                  width: calculateWidth(subData[0]?.[val.key] || 0),
                  background: `linear-gradient(to right, ${val.beforeFrom}, ${val.beforeTo})`,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
