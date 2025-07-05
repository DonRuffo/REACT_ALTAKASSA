import React from "react";
const NotFound = () =>{
    return(
        <>
            <section>
                <div className="flex flex-col items-center mt-5">
                    <h1 className="text-4xl font-CalSans dark:text-white">Página no encontrada</h1><br />
                    <p className="text-6xl font-Cabin dark:text-white">404</p>
                    <img src={'https://mqpsbzrziuppiigkbiva.supabase.co/storage/v1/object/sign/altakassa/SAD.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wODIxMTJiNC1kZDliLTQwZWUtYmUxMy1iNDZiMDI3Y2EzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhbHRha2Fzc2EvU0FELnN2ZyIsImlhdCI6MTc1MTY3NzE0MywiZXhwIjoyMDY3MDM3MTQzfQ.-S8ukYZIxnrBpYCdAZziLkTX63jyM92bquniT0_dw-U'} alt="No encontrado" width={325} height={325} />
                </div>
            </section>
        </>
    )
}


export default NotFound