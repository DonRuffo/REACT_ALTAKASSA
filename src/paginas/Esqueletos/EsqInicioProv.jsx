import React from "react";

const EsqueletoInicioProv = () => {
    return(
        <>
            <div className="bg-transparent  animate-pulse">
                <section className="flex justify-center mt-5">
                    <div className="flex flex-col justify-center items-center gap-y-2 w-4/5 h-64 bg-gray-100 dark:bg-gray-800 rounded-md">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg w-52 lg:w-80 text-gray-300 dark:text-gray-700">.</div>
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg w-36 lg:w-60 text-gray-300 dark:text-gray-700">.</div>
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-32 h-32 text-gray-300 dark:text-gray-700 mt-3">.</div>
                    </div>
                </section>
                <section className="flex flex-col justify-center items-center mt-12">
                    <h1 className="text-center bg-gray-200 dark:bg-gray-700 text-gray-200 dark:text-gray-700 w-64 lg:w-84 rounded-lg">.</h1><br />
                    <div className="w-4/5 flex justify-center gap-x-4 gap-y-2 flex-wrap">
                        <div className="h-[260px] w-[200px] rounded-lg bg-gray-100 dark:bg-gray-800"></div>
                        <div className="h-[260px] w-[200px] rounded-lg bg-gray-100 dark:bg-gray-800"></div>
                        <div className="h-[260px] w-[200px] rounded-lg bg-gray-100 dark:bg-gray-800"></div>
                    </div>
                </section><br />
            </div>
        </>
    )
}

export default EsqueletoInicioProv