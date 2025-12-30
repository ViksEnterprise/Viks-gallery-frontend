import { SideNav } from "./NavBar/SideNav";

export const AdminLayout = ({ children }) => {
  return (
    <div className="flex w-full">
      <SideNav />
      <div className="w-[79%] fixed end-0 p-5 overflow-y-auto h-full">{children}</div>
    </div>
  );
};
