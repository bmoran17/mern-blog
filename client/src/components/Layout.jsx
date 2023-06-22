import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = ({username, setUsername}) => {
  return (
    <main>
      <Header username setUsername/>
      <Outlet />
    </main>
  )
}

export default Layout;