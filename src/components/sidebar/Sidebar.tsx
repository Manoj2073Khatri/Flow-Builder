
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { HiLogin, HiLogout} from 'react-icons/hi'
import type { RootState } from '../../reduxStore/store'
import { useSelector, useDispatch } from 'react-redux'
import { toggleArrowState } from '../../reduxStore/reducer/sidebarToggleSlice'
import { NavLink } from 'react-router-dom'
import {RiFlowChart} from 'react-icons/ri'

interface sidebarData{
   url: string;
   icon:any;
   linkName:string;
}


const Sidebar = () => {
    const show = useSelector((state: RootState) => state.sidebarToggle.value)
    const dispatch = useDispatch();

    // add sidebar links here
    const links:sidebarData []=[
        {
            url:'/',
            icon:<RiFlowChart/>,
            linkName:'WorkFlowBuilder'
        },
    ]



    return (
       
        <>
       
            <aside className="sidebar">
                <div className=" navbar-vertical">
                    <div className="navbar-logo">
                        <a className="navbar-brand text-white h4 mb-0 fw-bold text-decoration-none" href='/'>
                            {/* <span className="navbar-brand-icon me-1"><img width={20} height={20} src={logo} alt='VS'></img></span> */}
                 
                            <span className="navbar-brand-text">WF-Builder POC</span>
                        </a>

                        <OverlayTrigger
                            //    className="navbar-toggle" 
                            key={'right'}
                            placement={'right'}

                            rootClose
                            overlay={
                                <Tooltip id={`right`}>
                                    <strong>Show/Hide Sidebar</strong>.
                                </Tooltip>
                            }
                        >
                            <span className="navbar-toggle" onClick={() => dispatch(toggleArrowState())}>
                                {
                                    show ? <HiLogout className='menu-fold uil-left-arrow-from-left' /> : <HiLogin className='menu-unfold uil-arrow-to-right' />
                                }


                            </span>


                        </OverlayTrigger>

                       
                    </div>
                    <div className="navbar-wrapper">
                       
                        <ul className="navbar-nav">
                            <li className="nav-item">
                               {links.map((data:sidebarData,index:number)=>{
                                return  <NavLink key={index} to={data.url} className="nav-link">
                                                <span className="nav-icon d-flex">{data.icon}</span>
                                                <span className="nav-text">{data.linkName}</span>
                                            </NavLink>
                               })}
                            </li>
                           

                             
                        </ul>
                    </div>
                    <div className="navbar-footer">
                        <span>&copy; WorkFlowBuilder 2022. All Rights Reserved.</span>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar