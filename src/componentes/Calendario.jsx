import React from "react";

const Calendario = () => {

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const meses2 = [
        {
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
    return (
        <>
            <div className="flex flex-wrap">
                {meses2.map((mes) => (
                    <div className="w-[165px] h-[170px] border border-green-700 rounded-md">
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" className='cursor-pointer hover:-translate-x-0.5 transition-all duration-300'>
                                <path d="M14 19l-7-7 7-7v14z" />
                            </svg>
                            <h1>{mes.mes}</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" className='cursor-pointer hover:translate-x-0.5 transition-all duration-300'>
                                <path d="M10 5l7 7-7 7V5z" />
                            </svg>
                        </div>
                        <div className="grid grid-cols-7 text-sm">
                            <div className="flex-col justify-center items-center">
                                <p className={`text-center`}>D</p>
                                <p className={`text-center ${mes.D[0] === '-' ? 'invisible' : ''}`}>{mes.D[0]}</p>
                                <p className={`text-center ${mes.D[1] === '-' ? 'invisible' : ''}`}>{mes.D[1]}</p>
                                <p className={`text-center ${mes.D[2] === '-' ? 'invisible' : ''}`}>{mes.D[2]}</p>
                                <p className={`text-center ${mes.D[3] === '-' ? 'invisible' : ''}`}>{mes.D[3]}</p>
                                <p className={`text-center ${mes.D[4] === '-' ? 'invisible' : ''}`}>{mes.D[4]}</p>
                                <p className={`text-center ${mes.D[5] === '-' ? 'invisible' : ''}`}>{mes.D[5]}</p>

                            </div>
                            <div className="flex-col justify-center items-center">
                                <p className="text-center">L</p>
                                <p className={`text-center ${mes.L[0] === '-' ? 'invisible' : ''}`}>{mes.L[0]}</p>
                                <p className={`text-center ${mes.L[1] === '-' ? 'invisible' : ''}`}>{mes.L[1]}</p>
                                <p className={`text-center ${mes.L[2] === '-' ? 'invisible' : ''}`}>{mes.L[2]}</p>
                                <p className={`text-center ${mes.L[3] === '-' ? 'invisible' : ''}`}>{mes.L[3]}</p>
                                <p className={`text-center ${mes.L[4] === '-' ? 'invisible' : ''}`}>{mes.L[4]}</p>
                                <p className={`text-center ${mes.L[5] === '-' ? 'invisible' : ''}`}>{mes.L[5]}</p>

                            </div>
                            <div className="flex-col justify-center items-center">
                                <p className="text-center">M</p>
                                <p className={`text-center ${mes.M[0] === '-' ? 'invisible' : ''}`}>{mes.M[0]}</p>
                                <p className={`text-center ${mes.M[1] === '-' ? 'invisible' : ''}`}>{mes.M[1]}</p>
                                <p className={`text-center ${mes.M[2] === '-' ? 'invisible' : ''}`}>{mes.M[2]}</p>
                                <p className={`text-center ${mes.M[3] === '-' ? 'invisible' : ''}`}>{mes.M[3]}</p>
                                <p className={`text-center ${mes.M[4] === '-' ? 'invisible' : ''}`}>{mes.M[4]}</p>
                                <p className={`text-center ${mes.M[5] === '-' ? 'invisible' : ''}`}>{mes.M[5]}</p>

                            </div>
                            <div className="flex-col justify-center items-center">
                                <p className="text-center">Mi</p>
                                <p className={`text-center ${mes.Mi[0] === '-' ? 'invisible' : ''}`}>{mes.Mi[0]}</p>
                                <p className={`text-center ${mes.Mi[1] === '-' ? 'invisible' : ''}`}>{mes.Mi[1]}</p>
                                <p className={`text-center ${mes.Mi[2] === '-' ? 'invisible' : ''}`}>{mes.Mi[2]}</p>
                                <p className={`text-center ${mes.Mi[3] === '-' ? 'invisible' : ''}`}>{mes.Mi[3]}</p>
                                <p className={`text-center ${mes.Mi[4] === '-' ? 'invisible' : ''}`}>{mes.Mi[4]}</p>
                                <p className={`text-center ${mes.Mi[5] === '-' ? 'invisible' : ''}`}>{mes.Mi[5]}</p>

                            </div>
                            <div className="flex-col justify-center items-center">
                                <p className="text-center">J</p>
                                <p className={`text-center ${mes.J[0] === '-' ? 'invisible' : ''}`}>{mes.J[0]}</p>
                                <p className={`text-center ${mes.J[1] === '-' ? 'invisible' : ''}`}>{mes.J[1]}</p>
                                <p className={`text-center ${mes.J[2] === '-' ? 'invisible' : ''}`}>{mes.J[2]}</p>
                                <p className={`text-center ${mes.J[3] === '-' ? 'invisible' : ''}`}>{mes.J[3]}</p>
                                <p className={`text-center ${mes.J[4] === '-' ? 'invisible' : ''}`}>{mes.J[4]}</p>
                                <p className={`text-center ${mes.J[5] === '-' ? 'invisible' : ''}`}>{mes.J[5]}</p>

                            </div>
                            <div className="flex-col justify-center items-center">
                                <p className="text-center">V</p>
                                <p className={`text-center ${mes.V[0] === '-' ? 'invisible' : ''}`}>{mes.V[0]}</p>
                                <p className={`text-center ${mes.V[1] === '-' ? 'invisible' : ''}`}>{mes.V[1]}</p>
                                <p className={`text-center ${mes.V[2] === '-' ? 'invisible' : ''}`}>{mes.V[2]}</p>
                                <p className={`text-center ${mes.V[3] === '-' ? 'invisible' : ''}`}>{mes.V[3]}</p>
                                <p className={`text-center ${mes.V[4] === '-' ? 'invisible' : ''}`}>{mes.V[4]}</p>
                                <p className={`text-center ${mes.V[5] === '-' ? 'invisible' : ''}`}>{mes.V[5]}</p>

                            </div>
                            <div className="flex-col justify-center items-center">
                                <p className="text-center">S</p>
                                <p className={`text-center ${mes.S[0] === '-' ? 'invisible' : ''}`}>{mes.S[0]}</p>
                                <p className={`text-center ${mes.S[1] === '-' ? 'invisible' : ''}`}>{mes.S[1]}</p>
                                <p className={`text-center ${mes.S[2] === '-' ? 'invisible' : ''}`}>{mes.S[2]}</p>
                                <p className={`text-center ${mes.S[3] === '-' ? 'invisible' : ''}`}>{mes.S[3]}</p>
                                <p className={`text-center ${mes.S[4] === '-' ? 'invisible' : ''}`}>{mes.S[4]}</p>
                                <p className={`text-center ${mes.S[5] === '-' ? 'invisible' : ''}`}>{mes.S[5]}</p>

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