import React from "react";
import logoNotFound from '../assets/neutral.svg'
const PaginaInexistente = () =>{
    return(
        <>
            <section>
                <div className="flex flex-col items-center mt-5">
                    <h1 className="text-4xl font-semibold">Página no permitida</h1><br />
                    <p className="text-5xl font-semibold">404</p>
                    <img src={logoNotFound} alt="No encontrado" width={325} height={325} />
                </div>
            </section>
        </>
    )
}


export default PaginaInexistente