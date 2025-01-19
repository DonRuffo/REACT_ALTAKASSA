import React, { useState } from "react";
import logoInicio from '../assets/SVG_Construccion.svg'
import logoMenu from '../assets/category.png'
import logoMenuAbierto from '../assets/hamburger.png'
const Inicio = () => {
    const [menu, setMenu] = useState(false)
    return (//#BA05FF COLOR DEL SISTEMA
        <>
            <div className="lg:hidden pb-2">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={()=>setMenu(!menu)} className={`${menu === true ? 'hidden': ''} cursor-pointer duration-300`}/>
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={()=>setMenu(!menu)} className={`${menu === false ? 'hidden': ''} cursor-pointer duration-300`}/>

            </div>
            <section className="flex justify-center">
                
                <div className="rounded-md shadow-lg w-4/5">
                    <h1 className="text-3xl text-center text-purple-800 font-semibold pt-8 px-3 md:px-0">¡Bienvenido de nuevo, agenda tu cita!</h1>
                    <h2 className="text-xl text-center pt-3 pb-5 px-3 md:px-0">¡Contamos con más de 100 profesionales a tu servicio!</h2>
                    <div className="flex justify-center pb-5">
                        <img src={logoInicio} alt="Constructor" width={200} height={200} className='rounded-full border-2 border-black-600' />
                    </div>
                </div>
            </section>
        </>
    )
}


export default Inicio