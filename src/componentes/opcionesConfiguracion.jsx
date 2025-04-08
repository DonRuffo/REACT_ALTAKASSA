import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ConfigContext from "../context/ConfigProvider";
import { useAuth } from "../context/AuthProvider";

const OpcionConfig = ({titulo, logo, clic}) => {
    const { auth } = useAuth()
    
    return (
        <li className={`group/list w-full rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 duration-100`}>
            <Link onClick={clic} className="flex justify-between px-5 py-3"> 
                <div className="flex gap-2">
                    {logo}
                    {titulo}
                </div> 
                <div onClick={clic}  className="cursor-pointer flex group/opt invisible group-hover/list:visible group-hover/list:text-slate-500">
                    <span className="px-4 font-semibold  group-hover/opt:bg-gray-300 flex rounded-xl group-hover/opt:text-gray-700">Ir <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/opt:text-gray-900 w-6 h-6 group-hover/opt:translate-x-0.5 transition-transform duration-300 ease-in-out">
                        <path d="M9 18l6-6-6-6" />
                    </svg></span>
                </div>
            </Link>
        </li>
    )
}

export default OpcionConfig