import React from "react";
const PaginaNoPermitida = () =>{
    return(
        <>
            <section>
                <div className="flex flex-col items-center mt-5">
                    <h1 className="text-4xl font-CalSans dark:text-white">Página no permitida</h1><br />
                    <p className="text-6xl font-Cabin dark:text-white">404</p>
                    <img src={'https://mqpsbzrziuppiigkbiva.supabase.co/storage/v1/object/sign/altakassa/neutral.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wODIxMTJiNC1kZDliLTQwZWUtYmUxMy1iNDZiMDI3Y2EzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhbHRha2Fzc2EvbmV1dHJhbC5zdmciLCJpYXQiOjE3NTE2NzcyMTAsImV4cCI6MjA2NzAzNzIxMH0.kKt-OUGOSHbnZSEkBN8zErdMxmINU84hNAtAbevIQRM'} alt="No encontrado" width={325} height={325} />
                </div>
            </section>
        </>
    )
}


export default PaginaNoPermitida