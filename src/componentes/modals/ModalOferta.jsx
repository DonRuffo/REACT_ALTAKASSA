import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import OfertaStore from "../../store/OfertaStore";
import SpinnerCargaModal from "../RuedaCargaModal";
import AuthStoreContext from "../../store/AuthStore";

const ModalOferta = () => {

    const { modalOf, setModalOf} = OfertaStore()
    const {categorias} = AuthStoreContext()
    const [carga, setCarga] = useState(false)
    const [formOf, setFormOf] = useState({
        precioPorDia: "",
        precioPorHora: "",
        servicio: "Limpieza",
        descripcion: "",
        servicios: []
    })

    const [lista, setLista] = useState(false)
    const [llenado, setLlenado] = useState(false)
    const [cat, setCat] = useState('Limpieza')
    const [ventana, setVentana] = useState(false)

    const handleCreateOferta = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/crearOferta`
            const token = localStorage.getItem('token')
            const options = {
                headers: {
                    method: 'POST',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url, formOf, options)
            toast.success(respuesta.data.msg)

            setCarga(false)
            setTimeout(() => {
                if (modalOf === true) {
                    setModalOf(false)
                }
            }, 2000)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
            error.response.data.msg.forEach((mensaje) => {
                toast.error(mensaje)
            })
            setCarga(false)
            setLlenado(false)
        }

    }

    const handleChange = (e) => {
        setFormOf({
            ...formOf,
            [e.target.name]: e.target.value
        })
        if (e.target.name === 'servicio') {
            setCat(e.target.value)
            setFormOf((prev) => {
                return {
                    ...prev,
                    servicios: []
                }
            })
            setLista(false)
        }
    }

    const manejoBox = (caracteristica) => {
        setFormOf((prev) => {
            if (formOf.servicios.includes(caracteristica)) {
                return {
                    ...prev,
                    servicios: [...prev.servicios.filter(tra => tra !== caracteristica)]
                }
            } else {
                return {
                    ...prev,
                    servicios: [...prev.servicios, caracteristica]
                }
            }
        })
    }

    useEffect(() => {
        if (formOf.servicios.length > 0) {
            setLista(true)
        } else {
            setLista(false)
        }
        if (formOf.descripcion !== '' && formOf.precioPorDia !== '' && formOf.precioPorHora !== '' && formOf.servicios.length > 0) {
            setLlenado(true)
        } else {
            setLlenado(false)
        }
    }, [formOf])

    const plomero = [{
        titulo: 'Instalaciones',
        caracteristicas: ['Tuberías de agua potable y desagüe.',
            'Calentadores de agua (eléctricos o a gas).',
            'Sanitarios (inodoros, lavamanos, bidés).',
            'Grifos y mezcladoras.',
            'Bombas de agua y presurizadores.',
            'Sistemas de filtrado y purificación de agua.',
            'Sistemas de riego para jardines.']
    },
    {
        titulo: 'Reparaciones',
        caracteristicas: ['Fugas de agua en tuberías.',
            'Grifos que gotean.',
            'Inodoros con fugas o que no descargan bien.',
            'Calentadores de agua que no calientan correctamente.',
            'Tuberías rotas o dañadas.',
            'Bombas de agua que no funcionan.']
    },
    {
        titulo: 'Destapado y mantenimiento',
        caracteristicas: ['Destape de cañerías y desagües obstruidos.',
            'Limpieza y mantenimiento de tuberías de agua y drenaje.',
            'Destape de inodoros y lavamanos tapados.',
            'Eliminación de sarro y acumulaciones en tuberías.']
    },
    {
        titulo: 'Detección y Solución de Problemas',
        caracteristicas: ['Detección de fugas de agua.',
            'Diagnóstico de baja presión en tuberías.',
            'Revisión de humedad y filtraciones en paredes o pisos.']
    },
    {
        titulo: 'Gasfitería',
        caracteristicas: ['Instalación y reparación de tuberías de gas.',
            'Detección de fugas de gas.',
            'Instalación y mantenimiento de calentadores de gas.']
    }
    ]
    const limpieza = [{
        titulo: 'Limpieza General',
        caracteristicas: [
            'Barrido y trapeado de pisos.',
            'Aspirado de alfombras y tapetes.',
            'Limpieza de polvo en muebles, mesas y repisas.',
            'Limpieza de puertas y marcos de ventanas.',
            'Sacudido y desinfección de superficies.'
        ]
    },
    {
        titulo: 'Limpieza de Habitaciones',
        caracteristicas: [
            'Cambio de sábanas y tendido de camas.',
            'Limpieza y organización de closets y cajones.',
            'Aspirado y limpieza de colchones.',
            'Eliminación de telarañas en esquinas y techos.'
        ]
    },
    {
        titulo: 'Limpieza de Cocina',
        caracteristicas: [
            'Lavado de platos, vasos y utensilios.',
            'Limpieza de estufa, horno y microondas.',
            'Limpieza y desinfección de encimeras y fregadero.',
            'Limpieza de despensas y refrigerador.',
            'Eliminación de grasa en superficies.'
        ]
    },
    {
        titulo: 'Limpieza de Baños',
        caracteristicas: [
            'Lavado y desinfección de inodoros, lavamanos y duchas.',
            'Limpieza de espejos y superficies de vidrio.',
            'Eliminación de sarro y moho en azulejos.',
            'Reposición de papel higiénico y toallas.'
        ]
    },
    {
        titulo: 'Limpieza de Ventanas y Cortinas',
        caracteristicas: [
            'Limpieza de vidrios interiores y exteriores.',
            'Retiro y lavado de cortinas o persianas.',
            'Eliminación de manchas en ventanas.'
        ]
    },
    {
        titulo: 'Limpieza de Espacios Exteriores ',
        caracteristicas: [
            'Barrido de patios y terrazas.',
            'Limpieza de muebles de jardín.',
            'Riego de plantas si es solicitado.'
        ]
    }
    ]
    const tecnico = [{
        titulo: 'Reparación y Mantenimiento',
        caracteristicas: [
            'Diagnóstico de fallas en electrodomésticos.',
            'Reparación de refrigeradores y neveras.',
            'Reparación de lavadoras y secadoras.',
            'Reparación de estufas y hornos eléctricos o de gas.',
            'Reparación de microondas (magnetrón, fusibles, tablero de control).',
            'Reparación de aires acondicionados y climatizadores.',
            'Reparación de extractores de aire y campanas de cocina.',
            'Reparación de licuadoras, batidoras y procesadores de alimentos.',
            'Reparación de cafeteras y hervidores eléctricos.',
            'Reparación de planchas de ropa y vaporizadores.',
            'Reparación de aspiradoras y robots de limpieza.'
        ]
    },
    {
        titulo: 'Instalación de Electrodomésticos',
        caracteristicas: [
            'Instalación de refrigeradores y ajustes de temperatura.',
            'Instalación de lavadoras y secadoras con conexión a agua y desagüe.',
            'Instalación de estufas y hornos (eléctricos y de gas).',
            'Instalación de lavavajillas con conexión de agua..',
            'Instalación de aires acondicionados tipo split y de ventana.',
            'Instalación de calentadores de agua eléctricos y de gas.',
            'Instalación de campanas extractoras en cocinas.',
            'Instalación de televisores en pared y configuración inicial.'
        ]
    },
    {
        titulo: 'Mantenimiento Preventivo',
        caracteristicas: [
            'Limpieza de filtros en refrigeradores y aires acondicionados.',
            'Cambio de empaques y gomas en refrigeradores.',
            'Lubricación de motores en electrodomésticos de alto uso.',
            'Desincrustación de cal en cafeteras y calentadores de agua.',
            'Revisión y ajuste de sensores de temperatura en electrodomésticos.'
        ]
    },
    {
        titulo: 'Electricidad en Electrodomésticos',
        caracteristicas: [
            'Cambio de cables y enchufes en equipos dañados.',
            'Reparación de placas electrónicas y tarjetas de control.',
            'Sustitución de fusibles y relés en electrodomésticos.',
            'Solución de problemas de cortocircuitos en aparatos eléctricos.'
        ]
    },
    {
        titulo: 'Optimización y Eficiencia Energética',
        caracteristicas: [
            'Asesoría en el uso eficiente de electrodomésticos.',
            'Instalación de temporizadores y reguladores de voltaje para electrodomésticos.'
        ]
    }
    ]
    const carpintero = [{
        titulo: 'Fabricación Muebles a Medida',
        caracteristicas: [
            'Diseño y construcción de muebles personalizados.',
            'Fabricación de closets empotrados y modulares.',
            'Creación de muebles de cocina y baño a medida.',
            'Fabricación de camas, literas y cabeceras personalizadas.',
            'Construcción de estanterías y bibliotecas en madera.',
            'Diseño y elaboración de puertas de madera.'
        ]
    },
    {
        titulo: 'Reparación y Restauración',
        caracteristicas: [
            'Restauración de muebles antiguos o dañados.',
            'Reparación de mesas, sillas, y escritorios.',
            'Cambio de bisagras, rieles y manijas en muebles.',
            'Reemplazo de partes dañadas en puertas y ventanas de madera.',
            'Reparación de madera agrietada o carcomida.',
            'Lijado y repintado de muebles y estructuras de madera.'
        ]
    },
    {
        titulo: 'Instalación y Montaje',
        caracteristicas: [
            'Instalación de puertas de madera y ajustes en marcos.',
            'Montaje de muebles de cocina y closets.',
            'Instalación de pisos laminados o de madera.',
            'Montaje de estanterías y repisas en paredes.',
            ' Instalación de molduras y rodapiés.'
        ]
    },
    {
        titulo: 'Acabados y Tratamientos en Madera',
        caracteristicas: [
            'Barnizado y sellado de muebles y estructuras.',
            'Aplicación de pinturas y lacas en madera.',
            'Tratamientos contra humedad, termitas y hongos.',
            'Pulido y encerado de muebles y pisos de madera.'
        ]
    },
    {
        titulo: 'Reparaciones en Estructuras de Madera',
        caracteristicas: [
            'Refuerzo y reparación de techos de madera.',
            'Cambio o ajuste de vigas y columnas de madera.',
            'Reparación de pérgolas y estructuras de jardín.'
        ]
    }
    ]
    const albañil = [{
        titulo: 'Construcción General',
        caracteristicas: [
            'Levantamiento de muros con bloques, ladrillos o tabiques.',
            'Colado de losas, pisos y techos de concreto.',
            'Construcción de columnas, vigas y cimentaciones.',
            'Elaboración de escaleras de concreto.',
            'Colocación de techumbres y cubiertas.'
        ]
    },
    {
        titulo: 'Reparaciones y Mantenimiento',
        caracteristicas: [
            'Reparación de grietas en paredes y techos.',
            'Reparación de muros dañados por humedad o filtraciones.',
            'Refuerzo de estructuras debilitadas.',
            'Sustitución de bloques o ladrillos deteriorados.',
            'Relleno y nivelación de pisos o terrenos irregulares.'
        ]
    },
    {
        titulo: 'Obra Negra',
        caracteristicas: [
            'Trazo y nivelación de terreno para construcción.',
            'Construcción de estructuras base de casas y edificaciones.',
            'Instalación de castillos y cadenas de amarre.',
            'Preparación e instalación de acero de refuerzo.'
        ]
    },
    {
        titulo: 'Obra Blanca y Acabados',
        caracteristicas: [
            'Revoque y aplanado de paredes interiores y exteriores.',
            'Colocación de molduras, marcos y cornisas.',
            'Aplicación de estuco o pasta texturizada.',
            'Pulido de muros y techos para pintura.'
        ]
    },
    {
        titulo: "Colocación de Revestimientos",
        caracteristicas: [
            'Colocación de azulejos y cerámica en pisos y muros.',
            'Instalación de porcelanato, mármol o granito.',
            'Colocación de pisos de cemento pulido.',
            'Instalación de zócalos y rodapiés.'
        ]
    },
    {
        titulo: "Trabajos con Plomería y Electricidad",
        caracteristicas: [
            'Canalización para instalaciones eléctricas o hidráulicas.',
            'Paso de tuberías en muros o pisos.',
            'Asistencia en colocación de registros y bajantes.'
        ]
    },
    {
        titulo: "Instalaciones Generales",
        caracteristicas: [
            'Instalación de marcos de puertas y ventanas.',
            'Sellado de juntas con cemento o silicón.',
            'Preparación para instalación de muebles fijos (lavamanos, inodoros, lavaplatos).'
        ]
    }
    ]
    const pintor = [{
        titulo: 'Pintura de Interiores y Exteriores',
        caracteristicas: [
            'Aplicación de pintura en paredes y techos interiores.',
            'Pintura de fachadas y exteriores de casas y edificios.',
            'Pintura de habitaciones, salas, cocinas y baños.',
            'Pintura de techos altos o con acabados especiales.'
        ]
    }, {
        titulo: 'Preparación de Superficies',
        caracteristicas: [
            'Lijado de paredes y techos para una mejor adherencia.',
            'Eliminación de pintura vieja o descascarada.',
            'Reparación de grietas y agujeros en paredes antes de pintar.',
            'Aplicación de selladores y fijadores en muros porosos.'
        ]
    },
    {
        titulo: 'Aplicación de Tipos de Pintura',
        caracteristicas: [
            'Aplicación de pintura acrílica, vinílica o esmalte.',
            'Pintura con acabado mate, satinado o brillante.',
            'Uso de pinturas lavables y resistentes a la humedad.',
            'Aplicación de pintura antihongos y antimoho en zonas húmedas.',
            'Pintura con esmalte sintético en puertas y ventanas.'
        ]
    },
    {
        titulo: 'Acabados Especiales',
        caracteristicas: [
            'Aplicación de efectos decorativos como esponjeado o degradado.',
            'Texturizados en paredes con pasta o estuco.',
            'Pintura con rodillo, brocha o pistola de aire según el acabado deseado.',
            'Pintura epóxica para pisos de concreto en patios o cocheras.'
        ]
    },
    {
        titulo: 'Pintura de Elementos Adicionales',
        caracteristicas: [
            'Pintura de puertas y marcos de madera o metal.',
            'Pintura de barandales, rejas y portones metálicos.',
            'Pintura de muebles empotrados como closets y gabinetes.',
            'Pintura de techos de lámina o estructuras metálicas.'
        ]
    },
    {
        titulo: 'Mantenimiento y Protección',
        caracteristicas: [
            'Impermeabilización de techos y azoteas.',
            'Aplicación de barniz protector en madera.',
            'Uso de selladores para prevenir filtraciones de agua.',
            'Aplicación de recubrimientos térmicos y reflectantes.'
        ]
    }
    ]

    return (
        <>
            <div className="fixed bg-black/80 inset-0 transition-all duration-300">
                <ToastContainer
                    toastStyle={{ backgroundColor: '#1c2833 ', color: 'white' }}
                    closeOnClick
                    position="bottom-center"
                />
                <div className="fixed dark:border-none outline-2 outline-emerald-700 dark:outline-emerald-500 top-1/5 md:top-1/4 left-[40px] md:left-[150px] lg:left-[425px] xl:left-[550px] right-[40px] md:right-[150px] lg:right-[200px] xl:right-[370px] min-w-64 lg:min-w-lg bg-gradient-to-t from-white via-emerald-50 to-emerald-100 dark:from-black dark:via-emerald-950 dark:to-emerald-900 rounded-lg shadow-2xl">
                    <h1 className="border-b-2 border-emerald-700 dark:border-emerald-500 rounded-lg pb-5 text-2xl font-CalSans text-center pt-4 text-emerald-700 dark:text-emerald-500">Nueva oferta</h1>
                    <form onSubmit={handleCreateOferta} className={`mx-2 ${ventana ? 'hidden' : ''}`}>
                        <div className="my-3">
                            <div className="flex justify-around flex-wrap gap-2">
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="precioPorDia" className="text-md font-semibold dark:text-white">Precio/Dia:</label>
                                    <input type="number" id="precioPorDia" name="precioPorDia" onChange={handleChange} value={formOf.precioPorDia || ""} className="dark:bg-gray-900 dark:text-slate-200 w-20 py-1 px-2 rounded-md border border-gray-600 bg-white focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700" />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="precioPorHora" className="text-md font-semibold  dark:text-white">Precio/Hora:</label>
                                    <input type="number" id="precioPorHora" name="precioPorHora" onChange={handleChange} value={formOf.precioPorHora || ""} className="dark:bg-gray-900 dark:text-slate-200 w-20 py-1 px-2 rounded-md border border-gray-600 bg-white focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-center gap-2 px-6 items-center">
                                <label htmlFor="servicio" className="text-md font-semibold dark:text-white">Categoría:</label>
                                <select name="servicio" id="servicio" className="dark:bg-gray-900 dark:text-slate-200 w-full py-1 px-2 rounded-md border border-gray-600 bg-white focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700" onChange={handleChange}>
                                    {categorias.map((cat) => (
                                        <option key={cat.nombre} value={cat.nombre} className="dark:bg-gray-900 dark:text-slate-200">{cat.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 px-6 flex items-center text-emerald-600">
                            <label htmlFor="servicios" className="text-md font-semibold text-black dark:text-white">Servicios:</label>
                            <button type="button" className="px-3 py-1 rounded-xl bg-emerald-600 font-semibold mx-3.5 cursor-pointer text-white hover:brightness-110 duration-300" onClick={() => { setVentana(true) }}>Elegir servicios</button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`size-7 ${lista ? '' : 'hidden'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div className={`flex gap-x-0.5 items-center text-orange-500 ${lista ? 'hidden' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`size-6`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                                </svg>
                                <p className="text-sm">Requerido</p>
                            </div>
                        </div>
                        <div className="mb-3 px-6">
                            <label htmlFor="descripcion" className="text-md font-semibold block dark:text-white mb-1">Descripción: </label>
                            <textarea name="descripcion" id="descripcion" onChange={handleChange} value={formOf.descripcion || ""} className="overflow-hidden min-h-12 max-h-20 dark:bg-gray-900 dark:text-slate-200 p-2 w-full rounded-md bg-white border border-gray-600 focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700"></textarea>
                        </div><br />
                        <div className="mb-3">
                            <div className="flex justify-around">
                                <button type="submit" className={`py-2 px-7 font-semibold text-emerald-700 bg-emerald-200 dark:text-emerald-200 dark:bg-emerald-900 rounded-lg hover:scale-105 duration-300 ${llenado ? 'cursor-pointer' : 'pointer-events-none cursor-not-allowed opacity-50'} `} onClick={() => { setCarga(true) }}>{carga ? <SpinnerCargaModal h={6} w={6} HH={6} /> : 'Crear'}</button>
                                <button type="button" className="py-2 px-6 font-semibold text-red-700 bg-red-200 dark:text-red-200 dark:bg-red-900 rounded-lg hover:scale-105 duration-300 cursor-pointer" onClick={() => { setModalOf(!modalOf) }}>Cerrar</button>
                            </div>
                        </div>
                    </form>
                    <div className={`${ventana ? '' : 'hidden'} px-5 dark:text-white overflow-y-auto max-h-[400px]`}>
                        <h1 className="text-xl md:text-2xl font-semibold text-center mt-3">{cat}</h1>
                        <p className="text-center font-semibold text-sm md:text-base mb-3">Especifica las labores que eres capaz de realizar para una meyor transparencia en tus servicios</p>
                        <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 ${cat === 'Limpieza' ? '' : 'hidden'} ml-4`}>
                            {limpieza.map((tra) => (
                                <div key={tra.titulo}>
                                    <h1 className="font-semibold text-lg text-amber-500">{tra.titulo}</h1>
                                    {tra.caracteristicas.map((car, index) => (
                                        <label key={index} className="inline-block">
                                            <input type="checkbox" value={car} checked={formOf.servicios.includes(car)} onChange={() => { manejoBox(car) }} />
                                            {car}
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${cat === 'Plomería' ? '' : 'hidden'} ml-4`}>
                            {plomero.map((tra) => (
                                <div key={tra.titulo}>
                                    <h1 className="font-semibold text-lg text-amber-500">{tra.titulo}</h1>
                                    {tra.caracteristicas.map((car, index) => (
                                        <label key={index} className="inline-block">
                                            <input type="checkbox" value={car} checked={formOf.servicios.includes(car)} onChange={() => { manejoBox(car) }} />
                                            {car}
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${cat === 'Pintor' ? '' : 'hidden'} ml-4`}>
                            {pintor.map((tra) => (
                                <div key={tra.titulo}>
                                    <h1 className="font-semibold text-lg text-amber-500">{tra.titulo}</h1>
                                    {tra.caracteristicas.map((car, index) => (
                                        <label key={index} className="inline-block">
                                            <input type="checkbox" value={car} checked={formOf.servicios.includes(car)} onChange={() => { manejoBox(car) }} />
                                            {car}
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-4 ${cat === 'Téc.Electrodomésticos' ? '' : 'hidden'} ml-2`}>
                            {tecnico.map((tra) => (
                                <div key={tra.titulo}>
                                    <h1 className="font-semibold text-lg text-amber-500">{tra.titulo}</h1>
                                    {tra.caracteristicas.map((car, index) => (
                                        <label key={index} className="inline-block">
                                            <input type="checkbox" value={car} checked={formOf.servicios.includes(car)} onChange={() => { manejoBox(car) }} />
                                            {car}
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${cat === 'Carpintería' ? '' : 'hidden'} ml-4`}>
                            {carpintero.map((tra) => (
                                <div key={tra.titulo}>
                                    <h1 className="font-semibold text-lg text-amber-500">{tra.titulo}</h1>
                                    {tra.caracteristicas.map((car, index) => (
                                        <label key={index} className="inline-block">
                                            <input type="checkbox" value={car} checked={formOf.servicios.includes(car)} onChange={() => { manejoBox(car) }} />
                                            {car}
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${cat === 'Albañilería' ? '' : 'hidden'} ml-4`}>
                            {albañil.map((tra) => (
                                <div key={tra.titulo}>
                                    <h1 className="font-semibold text-lg text-amber-500">{tra.titulo}</h1>
                                    {tra.caracteristicas.map((car, index) => (
                                        <label key={index} className="inline-block">
                                            <input type="checkbox" value={car} checked={formOf.servicios.includes(car)} onChange={() => { manejoBox(car) }} />
                                            {car}
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="w-full flex justify-center mb-3">
                            <button className="px-3 py-1 rounded-xl bg-emerald-700 text-white cursor-pointer hover:brightness-110 duration-300" onClick={() => { setVentana(false) }}>Aplicar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ModalOferta