import Content from "./Content";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-9 min-h-screen">
      <Sidebar className="bg-red-600 col-span-2" />
      <Content className="bg-blue-500 col-span-7" />
    </div>
  );
};

export default Layout;