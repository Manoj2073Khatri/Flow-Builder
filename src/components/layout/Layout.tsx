import { Outlet } from "react-router-dom"
import HeaderTopBar from "../headerTopBar/HeaderTopBar"
import Sidebar from "../sidebar/Sidebar"

const Layout = () => {
    return <div className='wrapper'>
    <div className='main'>
            <Sidebar />
            <div className='content'>
                    <HeaderTopBar />
                    <Outlet/>
            </div>
    </div>  
</div>
}

export default Layout