import React, { useState } from "react";

import AuthStoreContext from "../store/AuthStore";
import OfertaStore from "../store/OfertaStore";

const Calendario = () => {
    const { dark } = AuthStoreContext()
    const { fechas } = OfertaStore()

    const meses2 = [
        {
            id: 1,
            mes: 'Enero',
            D: ['-', '5', '12', '19', '26', '-'],
            L: ['-', '6', '13', '20', '27', '-'],
            M: ['-', '7', '14', '21', '28', '-'],
            Mi: ['1', '8', '15', '22', '29', '-'],
            J: ['2', '9', '16', '23', '30', '-'],
            V: ['3', '10', '17', '24', '31', '-'],
            S: ['4', '11', '18', '25', '-', '-']
        },
        {
            id: 2,
            mes: 'Febrero',
            D: ['-', '2', '9', '16', '23', '-'],
            L: ['-', '3', '10', '17', '24', '-'],
            M: ['-', '4', '11', '18', '25', '-'],
            Mi: ['-', '5', '12', '19', '26', '-'],
            J: ['-', '6', '13', '20', '27', '-'],
            V: ['-', '7', '14', '21', '28', '-'],
            S: ['1', '8', '15', '22', '-', '-']
        },
        {
            id: 3,
            mes: 'Marzo',
            D: ['-', '2', '9', '16', '23', '30'],
            L: ['-', '3', '10', '17', '24', '31'],
            M: ['-', '4', '11', '18', '25', '-'],
            Mi: ['-', '5', '12', '19', '26', '-'],
            J: ['-', '6', '13', '20', '27', '-'],
            V: ['-', '7', '14', '21', '28', '-'],
            S: ['1', '8', '15', '22', '29', '-']
        },
        {
            id: 4,
            mes: 'Abril',
            D: ['-', '6', '13', '20', '27', '-'],
            L: ['-', '7', '14', '21', '28', '-'],
            M: ['1', '8', '15', '22', '29', '-'],
            Mi: ['2', '9', '16', '23', '30', '-'],
            J: ['3', '10', '17', '24', '-', '-'],
            V: ['4', '11', '18', '25', '-', '-'],
            S: ['5', '12', '19', '26', '-', '-']
        },
        {
            id: 5,
            mes: 'Mayo',
            D: ['-', '4', '11', '18', '25', '-'],
            L: ['-', '5', '12', '19', '26', '-'],
            M: ['-', '6', '13', '20', '27', '-'],
            Mi: ['-', '7', '14', '21', '28', '-'],
            J: ['1', '8', '15', '22', '29', '-'],
            V: ['2', '9', '16', '23', '30', '-'],
            S: ['3', '10', '17', '24', '31', '-']
        },
        {
            id: 6,
            mes: 'Junio',
            D: ['1', '8', '15', '22', '29', '-'],
            L: ['2', '9', '16', '23', '30', '-'],
            M: ['3', '10', '17', '24', '-', '-'],
            Mi: ['4', '11', '18', '25', '-', '-'],
            J: ['5', '12', '19', '26', '-', '-'],
            V: ['6', '13', '20', '27', '-', '-'],
            S: ['7', '14', '21', '28', '-', '-']
        },
        {
            id: 7,
            mes: 'Julio',
            D: ['-', '6', '13', '20', '27', '-'],
            L: ['-', '7', '14', '21', '28', '-'],
            M: ['1', '8', '15', '22', '29', '-'],
            Mi: ['2', '9', '16', '23', '30', '-'],
            J: ['3', '10', '17', '24', '31', '-'],
            V: ['4', '11', '18', '25', '-', '-'],
            S: ['5', '12', '19', '26', '-', '-']
        },
        {
            id: 8,
            mes: 'Agosto',
            D: ['-', '3', '10', '17', '24', '31'],
            L: ['-', '4', '11', '18', '25', '-'],
            M: ['-', '5', '12', '19', '26', '-'],
            Mi: ['-', '6', '13', '20', '27', '-'],
            J: ['-', '7', '14', '21', '28', '-'],
            V: ['1', '8', '15', '22', '29', '-'],
            S: ['2', '9', '16', '23', '30', '-']
        },
        {
            id: 9,
            mes: 'Septiembre',
            D: ['-', '7', '14', '21', '28', '-'],
            L: ['1', '8', '15', '22', '29', '-'],
            M: ['2', '9', '16', '23', '30', '-'],
            Mi: ['3', '10', '17', '24', '-', '-'],
            J: ['4', '11', '18', '25', '-', '-'],
            V: ['5', '12', '19', '26', '-', '-'],
            S: ['6', '13', '20', '27', '-', '-']
        },
        {
            id: 10,
            mes: 'Octubre',
            D: ['-', '5', '12', '19', '26', '-'],
            L: ['-', '6', '13', '20', '27', '-'],
            M: ['-', '7', '14', '21', '28', '-'],
            Mi: ['1', '8', '15', '22', '29', '-'],
            J: ['2', '9', '16', '23', '30', '-'],
            V: ['3', '10', '17', '24', '31', '-'],
            S: ['4', '11', '18', '25', '-', '-']
        },
        {
            id: 11,
            mes: 'Noviembre',
            D: ['-', '2', '9', '16', '23', '30'],
            L: ['-', '3', '10', '17', '24', '-'],
            M: ['-', '4', '11', '18', '25', '-'],
            Mi: ['-', '5', '12', '19', '26', '-'],
            J: ['-', '6', '13', '20', '27', '-'],
            V: ['-', '7', '14', '21', '28', '-'],
            S: ['1', '8', '15', '22', '29', '-']
        },
        {
            id: 12,
            mes: 'Diciembre',
            D: ['-', '7', '14', '21', '28', '-'],
            L: ['1', '8', '15', '22', '29', '-'],
            M: ['2', '9', '16', '23', '30', '-'],
            Mi: ['3', '10', '17', '24', '31', '-'],
            J: ['4', '11', '18', '25', '-', '-'],
            V: ['5', '12', '19', '26', '-', '-'],
            S: ['6', '13', '20', '27', '-', '-']
        }
    ]

const [conteo, setConteo] = useState(1)

function derecha() {
    if (conteo >= 1 && conteo <= 11) {
        setConteo(conteo + 1)
    } else {
        setConteo(12)
    }
}
function izquierda() {
    if (conteo !== 1) {
        setConteo(conteo - 1)
    } else {
        setConteo(1)
    }
}


const diasEnCalendario = (dia, id) =>{
    const array = [0,1,2,3,4,5]
    return array.map((indx) =>(
        <p key={indx} className={`text-center ${dia[indx] === '-' ? 'invisible' : ''} ${fechas.some((fecha) => {
            let [mesNum, diaNum] = fecha.split('-').map(num => parseInt(num, 10));
            return mesNum === id && diaNum === parseInt(dia[indx], 10);
        }) ? 'bg-red-600' : ''}  rounded-md`}>{dia[indx]}</p>
    ))
}

return (
    <>
        <div className={dark ? 'dark' : ''}>
            {
                meses2.map((mes) => (
                    <div key={mes.id} className={`${conteo === mes.id ? "" : "hidden"} w-[165px] h-[150px] outline  outline-blue-100 dark:outline-blue-900 outline-offset-0 rounded-md shadow-lg dark:bg-gray-800  p-1`}>
                        <div className="flex justify-between pt-1 dark:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" className='cursor-pointer hover:-translate-x-0.5 transition-all duration-300' onClick={() => izquierda()}>
                                <path d="M14 19l-7-7 7-7v14z" />
                            </svg>
                            <h1 className="font-semibold text-blue-700 dark:text-blue-500">{mes.mes}</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" className='cursor-pointer hover:translate-x-0.5 transition-all duration-300' onClick={() => derecha()}>
                                <path d="M10 5l7 7-7 7V5z" />
                            </svg>
                        </div>

                        <div className="grid grid-cols-7 text-xs dark:text-white">
                            <div className="flex-col justify-center items-center">
                                <p className={`text-center font-bold`}>D</p>
                                {diasEnCalendario(mes.D, mes.id)}
                            </div>

                            <div className="flex-col justify-center items-center">
                                <p className="text-center font-bold">L</p>
                                {diasEnCalendario(mes.L, mes.id)}
                            </div>

                            <div className="flex-col justify-center items-center">
                                <p className="text-center font-bold">M</p>
                                {diasEnCalendario(mes.M, mes.id)}
                            </div>

                            <div className="flex-col justify-center items-center">
                                <p className="text-center font-bold">Mi</p>
                                {diasEnCalendario(mes.Mi, mes.id)}
                            </div>

                            <div className="flex-col justify-center items-center">
                                <p className="text-center font-bold">J</p>
                                {diasEnCalendario(mes.J, mes.id)}
                            </div>

                            <div className="flex-col justify-center items-center">
                                <p className="text-center font-bold">V</p>
                                {diasEnCalendario(mes.V, mes.id)}
                            </div>

                            <div className="flex-col justify-center items-center">
                                <p className="text-center font-bold">S</p>
                                {diasEnCalendario(mes.S, mes.id)}
                            </div>
                        </div>
                    </div>
                ))

            }
        </div>
    </>
)
}

export default Calendario