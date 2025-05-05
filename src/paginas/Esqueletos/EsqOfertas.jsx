import React from "react";

const EsqueletoOfertas = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-4 mt-8 animate-pulse">
                <h1 className="w-24 lg:w-44 bg-gray-100 text-gray-100 dark:bg-gray-800 dark:text-gray-800 rounded-lg">.</h1>
                <h1 className="w-44 lg:w-84 bg-gray-100 text-gray-100 dark:bg-gray-800 dark:text-gray-800 rounded-lg">.</h1>
                <div className="flex justify-center gap-4 mt-4 flex-wrap">
                    <div className="w-[200px] h-[260px] bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                    <div className="w-[200px] h-[260px] bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                    <div className="w-[200px] h-[260px] bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                </div>
            </div>
        </>
    )
}

export default EsqueletoOfertas