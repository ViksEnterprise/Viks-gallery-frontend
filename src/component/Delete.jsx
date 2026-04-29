export const Delete = ({
  title = "",
  id = "",
  loading,
  close = () => close(),
  open,
  onSubmit,
}) => {
  const handleDelete = () => {
    onSubmit(id);
  };

  if (!open) {
    return;
  }

  return (
    <div className="h-full w-full bg-black/40 absolute z-2 start-0 top-0 flex flex-col justify-center items-center">
      <div className="bg-white h-fit w-96 rounded-lg p-4 flex flex-col gap-3">
        <h3 className="text-lg uppercase font-medium">Delete {title}</h3>
        <span className="text-sm">
          You are about to delete the following item with:
        </span>
        <span className="text-sm text-gray-500 font-medium">ID: {id}</span>
        <div className="flex w-full justify-between">
          <button
            className="border h-9 border-slate-400 text-slate-500 cursor-pointer p-2 rounded-lg w-24 flex items-center justify-center text-sm"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="text-white h-9 bg-red-700 cursor-pointer p-2 rounded-lg w-24 flex items-center justify-center text-sm"
            onClick={handleDelete}
          >
            {loading ? (
              <span className="border-white border-t-transparent border-b-solid border-[3px] rounded-full h-7 w-7 animate-spin flex"></span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
