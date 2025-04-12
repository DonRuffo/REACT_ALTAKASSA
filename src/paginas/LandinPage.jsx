import React, { useContext } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logoDarkMode from '../assets/moon.png';
import logoAltaKassaNegro from '../assets/AK NEGRA.png';
import logoAltaKassaBlanco from '../assets/AK BLANCA.png';
import logoComodidad from '../assets/Comodidad.png';
import logoUsabilidad from '../assets/COHETE.png';
import logoTransparencia from '../assets/Transparencia.png';
import logoSeguridad from '../assets/Seguridad.png';
import logoGarantia from '../assets/Garantía.png';
import logoFiabilidad from '../assets/Fiabilidad.png'
import imgTuerca from '../assets/Tuerca tornasol.png';
import imgPlomeria from '../assets/Plomeria.png'
import imgElectro from '../assets/Electrodomestico.png'
import imgCarpinteria from '../assets/Carpinteria.png'
import imgLimpieza from '../assets/Limpieza.png'
import imgPintor from '../assets/Pintor.png'
import imgAlbanil from '../assets/Albañil.png'
import imgAksin from '../assets/AK BLANCA_sintexto.png'
import imgAstronauta from '../assets/astronauta.png'
import logoAgendar from '../assets/Agendar-lista.png'
import logoElegir from '../assets/Elegir-lista.png'
import logoCancelar from '../assets/Cancelar-lista.png'
import logoLlamadas from '../assets/Llamadas-lista.png'
import logoCalificar from '../assets/Calificar-lista.png'
import logoComunicar from '../assets/Comunicarse-lista.png'
import logoPago from '../assets/Pago-lista.png'
import logoCartera from '../assets/Cartera-lista.png'
import logoRevisar from '../assets/Revisar-lista.png'
import logoStars from '../assets/Stars-lista.png'
import logoPrecio from '../assets/Price-lista.png'
import logoPostergar from '../assets/Postergar-lista.png'
import logoActualizar from '../assets/Actualizar-lista.png'
import logoComunicarse from '../assets/Comunicarse2-lista.png'
import CardBeneficio from "../componentes/cardsBeneficios";
import CardDinamica from "../componentes/cardsDinamica";
import { useState } from "react";
import CardServicios from "../componentes/cardsServicios";
import ListasAnimadas from "../componentes/Listas";
import ListasAnimadasProv from "../componentes/ListasProv";
import imPerfilDinamica from '../assets/PERFIL_dinamica.jpg'
import AuthContext from "../context/AuthProvider";
import logoBG from '../assets/FondoPage.jpg'
import imgDesc from '../assets/Descriptivo.svg'
//text-slate-400 - texto para cards
//#60E8FE color para iconos
const LandingPage = () => {

    const { darkMode, handleDarkPage } = useContext(AuthContext)
    const [selectedOption, setSelectedOption] = useState('');

    const navigate = useNavigate()
    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

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
            'Organización y limpieza de despensas y refrigerador.',
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
        titulo: 'Organización de Espacios',
        caracteristicas: [
            'Organización de salas y áreas comunes.',
            'Organización de juguetes en habitaciones infantiles.',
            'Reubicación de muebles ligeros para una mejor limpieza.'
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

    const scrollLeer = () =>{
        const container = document.getElementById('DescriptionSection')
        if (container) {
            container.scrollIntoView({behavior:'smooth'})
        }
    }
    return (
        <>
            <div className={darkMode ? "dark" : ""}>
                <main className="bg-white dark:bg-gray-950">
                    <nav className="px-10 py-5 flex justify-between dark:bg-gray-950">
                        <select className="w-1/3 mr-1 md:mr-0 rounded-xl py-2 md:w-40 text-center text-purple-700 font-semibold bg-transparent outline focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 hover:brightness-110 duration-300"
                            onChange={(e) => {
                                const targetId = e.target.value
                                const targetElement = document.getElementById(targetId)
                                if (targetElement) {
                                    targetElement.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            <option value="Menu" className="text-sm font-semibold bg-gray-950">Menu</option>
                            <option value="QuienesSomos" className="text-sm font-semibold bg-gray-950">Quienes Somos</option>
                            <option value="Servicios" className="text-sm font-semibold bg-gray-950">Servicios</option>
                            <option value="Contacto" className="text-sm font-semibold bg-gray-950">Contacto</option>
                        </select>
                        <img src={logoDarkMode} alt="CambioTema" onClick={() => { handleDarkPage() }} width={40} height={40} className="cursor-pointer" />
                        <ul className="flex items-center">
                            <li><Link to='/login' className="w-1/4 px-6 py-2 my-4 mx-1 md:ml-14 bg-transparent outline text-purple-700 font-semibold rounded-xl hover:brightness-110 transition-all duration-300 text-center">Login</Link></li>
                        </ul>
                    </nav>
                    <section className="flex flex-col items-center justify-center bg-cover bg-center h-[550px] xl:h-[785px]"
                        id="Inicio" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),url(${logoBG})`}}>
                        <div className="flex flex-col items-center px-2">
                            <img src={imgAksin} alt="logoAlta" width={110} height={110} className="" />
                            <h1 className="text-white text-center text-5xl md:text-6xl font-bold">Bienvenido a AltaKassa</h1>
                            <p className="text-white font-semibold mt-2 text-lg text-center">Ofrecer o buscar un servicio nunca había sido más sencillo</p>
                        </div><br /><br />
                        <div className="flex justify-center gap-x-2 lg:gap-x-4 px-4">
                            <button type="button" onClick={() => navigate('/registro')} className="group px-5 py-1 md:py-3 rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white text-xl font-semibold flex items-center hover:brightness-110 transition-all duration-300">
                                Registarse
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="w-8 h-8 group-hover:scale-110 transition-all duration-300"
                                >
                                    <rect x="10" y="8" width="12" height="32" rx="2" ry="2" stroke="currentColor" />
                                    <path d="M22 10 L34 14 L34 34 L22 38 Z" stroke="currentColor" strokeLinejoin="round" />
                                    <path d="M38 24h-10" strokeLinecap="round" />
                                    <path d="M30 20l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button type="button" className="group px-5 py-1 md:py-3 rounded-3xl bg-gradient-to-r from-slate-100 via-emerald-200 to-emerald-500 text-xl font-semibold flex items-center hover:brightness-110 transition-all duration-300" onClick={scrollLeer}>
                                Continuar leyendo
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-7 h-7 group-hover:translate-y-1 transition-all duration-300">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 9l6 6 6-6"
                                    />
                                </svg>
                            </button>
                        </div>
                    </section>
                    <section id="DescriptionSection" className="pt-24 dark:bg-gray-950">
                        <div className="flex flex-col items-center bg-emerald-50 dark:bg-emerald-950">
                            <div className="w-5/6 lg:w-4/6 py-10">
                                <h1 className="text-center text-4xl lg:text-5xl font-semibold text-emerald-600 dark:text-emerald-500 duration-300 mb-2">¿Qué es AltaKassa?</h1>
                                <div className="md:flex">
                                    <div className="w-full md:w-3/5 flex flex-col justify-center mt-8 md:mt-0">
                                        <h1 className="text-left text-2xl font-bold mb-5 dark:text-white">Fácil para ti. Justo para ellos. Perfecto para todos</h1>
                                        <p className="text-justify lg:text-lg dark:text-white">
                                            AltaKassa Multiservicios es una plataforma que conecta a personas que necesitan servicios a domicilio
                                            —como plomería, limpieza, cerrajería, entre otros— con técnicos y especialistas capacitados.
                                            Nuestro objetivo es facilitar una experiencia rápida, práctica y segura, generando confianza y comodidad
                                            tanto para los clientes como para los proveedores de servicios.
                                        </p>
                                    </div>
                                    <div className="w-full md:w-2/5 flex justify-center items-center">
                                        <img src={imgDesc} alt="Floreciendo" width={350} height={250} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section><br /><br /><br />
                    <section>
                        <h1 className="text-4xl md:text-5xl font-semibold text-center text-emerald-600 dark:text-emerald-500 duration-300 pb-10">Beneficios para ti</h1>
                        <h2 className="text-4xl font-semibold text-center duration-300 pb-10 dark:text-white">Como cliente</h2>
                        <div className="flex flex-col items-center mx-0 md:flex-row md:flex-wrap justify-center gap-10 md:gap-8">
                            <CardBeneficio Beneficio={"Transparencia"} logo={logoTransparencia} texto={"Comunicación abierta y rendición de cuentas en tiempo real entre el cliente y proveedor"} />
                            <CardBeneficio Beneficio={"Garantía"} logo={logoGarantia} texto={"¡Calidad de la mano de obra 100% garantizado! Los proveedores son continuamente supervisados para brindar un servicio de calidad."} />
                            <CardBeneficio Beneficio={"Seguridad"} logo={logoSeguridad} texto={"¡Alta protección de información! Desde el registro de datos personales hasta la solicitud y cumplimiento de un servicio por parte de los/las proveedores."} />
                        </div><br /><br /><br /><br />
                        <h2 className="text-4xl font-semibold text-center duration-300 pb-10 dark:text-white">Como proveedor</h2>
                        <div className="flex flex-col items-center mx-0 md:flex-row md:flex-wrap justify-center gap-10 md:gap-8">
                            <CardBeneficio Beneficio={"Comodidad"} logo={logoComodidad} texto={"Ofrece fácilmente uno o más servicios en la plataforma y consigue ¡nuevos clientes mucho más rápido! desde la comodidad de tu hogar o trabajo."} />
                            <CardBeneficio Beneficio={"Usabilidad"} logo={logoUsabilidad} texto={"Sistema óptimo y sencillo de manejar, con un entorno amigable y una clara interfaz para navegar correctamente y realizar acciones específicas."} />
                            <CardBeneficio Beneficio={"Fiabilidad"} logo={logoFiabilidad} texto={"El sistema mantiene credibilidad en sus funciones y prioriza un ambiente de trabajo armónico entre proveedor y cliente, tanto en la plataforma como al prestar el servicio."} />
                        </div><br /><br /><br /><br />
                    </section>
                    <section className="flex flex-col items-center justify-center" id="Servicios">
                        <div className="w-4/5">
                            <h1 className="text-left text-5xl md:pl-5 font-semibold text-cyan-600">Servicios</h1>
                        </div>
                        <div className="w-4/5">
                            <div className="flex flex-col md:flex-row items-center md:gap-10">
                                <h2 className="w-full md:w-3/5 mt-5 md:py-2 md:px-5 text-md text-justify text-slate-600 dark:text-slate-300">La empresa se especializa en ofrecer soluciones integrales a domicilio a través
                                    de seis tipos de servicios diseñados para satisfacer las necesidades más
                                    comunes del hogar y el negocio. Cada servicio es brindado por técnicos capacitados,
                                    garantizando calidad, eficiencia y confianza en cada proyecto. Los servicios presentados
                                    fueron priorizados debido a la alta demanda que hay en la vida cotidiana de los
                                    ciudadanos.
                                </h2>
                                <img src={imgTuerca} alt="Tuerca" width={250} height={250} />
                            </div>
                        </div>
                    </section><br /><br />
                    <section>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-14">
                            <CardServicios Servicio1={"Plomería"} logo1={imgPlomeria} texto1={"Un buen sistema de plomería asegura un suministro de agua limpia y una gestión eficiente de los desechos, previniendo problemas como fugas, obstrucciones y contaminación del agua."} texto2={plomero} />
                            <CardServicios Servicio1={"Carpintería"} logo1={imgCarpinteria} texto1={"La carpintería combina habilidades técnicas-creativas, fundamental tanto en la construcción como en el diseño de interiores que aporta funcionalidad y estética a los espacios."} texto2={carpintero} />
                        </div><br /><br />
                        <div className="flex flex-col md:flex-row items-center justify-center gap-14">
                            <CardServicios Servicio1={"Pintor"} logo1={imgPintor} texto1={"Aplicación de pinturas, tintes y revestimientos en interiores y exteriores de edificios residenciales. Incluye la preparación de superficies mediante limpieza, lijado y reparación de fallas."} texto2={pintor} />
                            <CardServicios Servicio1={"Albañilería"} logo1={imgAlbanil} texto1={"Fundamental en la construcción de edificaciones e infraestructuras, combinando habilidades manuales con conocimiento en materiales, técnicas constructivas y normas de seguridad."} texto2={albañil} />
                        </div><br /><br />
                        <div className="flex flex-col md:flex-row items-center justify-center gap-14">
                            <CardServicios Servicio1={"Limpieza"} logo1={imgLimpieza} texto1={"Profesional especializado en la limpieza general del hogar. Mantener la casa libre de polvo e impurezas, tanto en losas y paredes como en muebles e inmuebles, es importante para la salud."} texto2={limpieza} />
                            <CardServicios Servicio1={"Técnico-Electrodomésticos"} logo1={imgElectro} texto1={"Profesional especializado en la instalación, mantenimiento y reparación de aparatos eléctricos utilizados en el hogar, como lavadoras, refrigeradores, hornos, microondas y lavavajillas."} texto2={tecnico} />
                        </div><br /><br /><br /><br /><br />
                    </section>
                    <section id="QuienesSomos" className="flex flex-col items-center justify-center md:mb-20">
                        <div className="w-4/5 border-4 border-dotted border-sky-400 rounded-md shadow-lg dark:shadow-purple-700 dark:border-purple-600">
                            <h1 className="text-4xl px-8 py-6 font-semibold text-sky-600 text-center dark:text-purple-700">¿Quiénes somos?</h1><br />
                            <div className="flex flex-col items-center md:flex-row">
                                <div className="w-3/5 md:w-2/5 flex justify-center max-h-[250px] pb-5 md:p-0">
                                    <img src={imgAstronauta} alt="Astronauta" width={250} height={250} />
                                </div>
                                <div className="w-4/5 md:w-3/5 md:pr-5">
                                    <p className="text-justify mb-3 dark:text-white"><b>Alta-Kassa Multiservicios</b>, una empresa fundada el 29 de junio del 2024 por los cofundadores
                                        Dennis Díaz y Martín Ayala,
                                        quienes vieron la necesidad de implementar un sistema en dónde la gente pueda encontrar una
                                        solución a ciertos
                                        problemas de su hogar.
                                    </p>
                                    <p className="text-justify mb-3 dark:text-white"><b className="text-orange-600 font-semibold dark:text-yellow-600">Visión: </b>En Alta-Kassa Multiservicios aspiramos a revolucionar la forma en que se brindan los servicios
                                        a domicilio en Ecuador, llevando soluciones profesionales, accesibles y de calidad a cada rincón del país. Queremos ser el puente que conecta a las personas con el talento que necesitan, de forma rápida, segura y sencilla.
                                    </p>
                                    <p className="text-justify mb-1 dark:text-white"><b className="text-blue-600 font-semibold dark:text-purple-600">Misión: </b>Ofrecer servicios profesionales de alta calidad a hogares y empresas,
                                        priorizando la comodidad, seguridad y confianza de nuestros clientes. En Alta-Kassa garantizamos una experiencia eficiente y flexible, con atención personalizada, métodos de pago accesibles y soporte
                                        tanto virtual como presencial. </p><br /><br />
                                </div>
                            </div>
                        </div>
                    </section><br /><br /><br /><br /><br />
                    <section className="flex justify-center">
                        <div className="w-4/5">
                            <h1 className="text-5xl text-center font-semibold text-sky-600 pb-4 dark:text-purple-700">Dinámica del sistema</h1>
                            <p className="text-center dark:text-white"><b>Importante: </b>Un cliente o proveedor deberá iniciar sesión o registrarse como primer requisito para ingresar
                                al sistema de la empresa</p><br />
                            <div className="flex justify-center">
                                <img src={imPerfilDinamica} alt="Perfil Dinamica" width={300} height={300} className="rounded-full shadow-md border-4 border-sky-700 dark:border-purple-700" />
                            </div><br /><br />
                            <h1 className="text-4xl text-sky-600 font-semibold dark:text-purple-700 text-center">Navega por el perfil</h1><br />

                            <div className="flex justify-center">
                                <div className="w-1/2 border p-3 rounded-lg">
                                    <label className="dark:has-[input:checked]:bg-transparent has-[input:checked]:bg-purple-100 has-[input:checked]:text-purple-800 has-[input:checked]:ring-1 has-[input:checked]:ring-purple-800 flex justify-between items-center p-5 rounded-lg mb-1 hover:bg-gray-100 font-semibold text-lg text-slate-600 dark:text-white  dark:hover:bg-transparent transition-all duration-200">
                                        Cliente
                                        <input type="radio" name="opcion" onChange={handleRadioChange} value='cliente' checked={selectedOption === 'cliente'} className="peer appearance-none w-4 h-4 rounded-full border checked:border-purple-800 checked:border-4" />
                                    </label>
                                    <label className="dark:has-[input:checked]:bg-transparent has-[input:checked]:bg-purple-100 has-[input:checked]:text-purple-800 has-[input:checked]:ring-1 has-[input:checked]:ring-purple-800 flex justify-between items-center p-5 rounded-lg mb-1 hover:bg-gray-100 font-semibold text-lg text-slate-600 dark:text-white  dark:hover:bg-transparent transition-all duration-200">
                                        Proveedor
                                        <input type="radio" name="opcion" onChange={handleRadioChange} value='proveedor' checked={selectedOption === 'proveedor'} className="peer appearance-none w-4 h-4 rounded-full border checked:border-purple-800 checked:border-4" />
                                    </label>
                                </div>
                            </div><br /><br />
                            {selectedOption === 'cliente' && (
                                <div className={`animate-fade-in`}>
                                    <h1 className="text-3xl dark:text-white"><b>Cliente</b></h1><br />
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <CardDinamica logo={logoAgendar} texto={"Agendar citas indicando la fecha y hora que más le conviene."} color={'sky'} colorDark={'purple'} />
                                        <CardDinamica logo={logoElegir} texto={"Elegir el proveedor de su preferencia o en base a su calificación."} color={'sky'} colorDark={'purple'} />
                                        <CardDinamica logo={logoCancelar} texto={"Cancelar una cita o postergarla."} color={'sky'} colorDark={'purple'} />
                                        <CardDinamica logo={logoLlamadas} texto={"Llamadas emergentes fuera de los horarios de atención."} color={'sky'} colorDark={'purple'} />
                                    </div><br />
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <CardDinamica logo={logoCalificar} texto={"Calificar al proveedor considerando actitudes, conductas y valores."} color={'sky'} colorDark={'purple'} />
                                        <CardDinamica logo={logoComunicar} texto={"Comunicarse con el proveedor por mensajería o llamada telefónica."} color={'sky'} colorDark={'purple'} />
                                        <CardDinamica logo={logoPago} texto={"Agregar un método de pago digital."} color={'sky'} colorDark={'purple'} />
                                        <CardDinamica logo={logoCartera} texto={"Elegir su método de pago preferido, ya sea digital, con tarjeta o en efectivo."} color={'sky'} colorDark={'purple'} />
                                    </div><br /><br /><br />
                                    <h1 className="text-center text-3xl font-semibold mb-5 text-purple-600 dark:text-sky-600">Tener en cuenta</h1>
                                    <div className="flex justify-center md:mb-10">
                                        <div className="w-5/6 md:w-1/2">
                                            <ListasAnimadas />
                                        </div>
                                    </div><br /><br /><br />
                                </div>
                            )}
                            {selectedOption === 'proveedor' && (
                                <div className={`animate-fade-in`}>
                                    <h1 className="text-3xl dark:text-white"><b>Proveedor</b></h1><br />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <CardDinamica logo={logoRevisar} texto={"Revisar el perfil de su cliente y la ubicación para dar el servicio."} color={'green'} colorDark={'yellow'} />
                                        <CardDinamica logo={logoStars} texto={"Calificar al cliente considerando valores como: trato, comportamiento y solvencia."} color={'green'} colorDark={'yellow'} />
                                        <CardDinamica logo={logoPrecio} texto={"Ofrecer el precio por consulta o mano de obra a los clientes (considerando el estándar de mínimo y máximo)."} color={'green'} colorDark={'yellow'} />
                                    </div><br />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <CardDinamica logo={logoPostergar} texto={"Cancelar o postergar una cita."} color={'green'} colorDark={'yellow'} />
                                        <CardDinamica logo={logoActualizar} texto={"Actualizar su estado de disponibilidad."} color={'green'} colorDark={'yellow'} />
                                        <CardDinamica logo={logoComunicarse} texto={"Comunicarse directamente con el cliente mediante el sistema de mensajería o llamada telefónica."} color={'green'} colorDark={'yellow'} />
                                    </div><br /><br /><br />
                                    <h1 className="text-center text-3xl font-semibold mb-5 text-purple-600 dark:text-sky-600">Tener en cuenta</h1>
                                    <div className="flex justify-center">
                                        <div className="w-5/6 md:w-1/2">
                                            <ListasAnimadasProv />
                                        </div>
                                    </div><br /><br /><br />
                                </div>
                            )}
                        </div>
                    </section><br />
                </main>
                <footer className="bg-black" id="Contacto">
                    <div className="flex flex-col md:flex-row items-center justify-center">
                        <div className="w-full flex-col md:flex-row md:w-4/5 flex justify-center">
                            <div className="w-full md:w-2/5 flex justify-center pt-8">
                                <img src={logoAltaKassaBlanco} alt="LogoEnFooter" width={325} height={325} />
                            </div>
                            <div className="w-full md:w-3/5 flex flex-wrap justify-center md:pt-10 gap-8">
                                <div className="w-48 p-2">
                                    <h1 className="text-sky-600 text-xl font-semibold md:pb-6">Contacto directo</h1>
                                    <p className="text-slate-400 text-sm font-semibold py-2">dennisdiaz407@gmail.com</p>
                                    <p className="text-slate-400 text-sm font-semibold py-2">martin.ayala@epn.edu.ec</p>
                                    <p className="text-slate-400 text-sm font-semibold py-2">Cel1: 0979438388</p>
                                    <p className="text-slate-400 text-sm font-semibold py-2">Cel2: 0983781929</p>
                                </div>
                                <div className="w-48 p-2">
                                    <h1 className="text-sky-600 text-xl font-semibold md:pb-6">Indice</h1>
                                    <ul className="text-slate-400 font-semibold text-sm">
                                        <li className="py-2">Foros</li>
                                        <li className="py-2"><a href="#Inicio" className="hover:text-white hover:underline duration-300">Inicio</a></li>
                                        <li className="py-2">Quienes Somos</li>
                                        <li className="py-2"><a href="#Servicios" className="hover:text-white hover:underline duration-300">Servicios</a></li>
                                    </ul>
                                </div>
                                <div className="w-48 p-2">
                                    <h1 className="text-sky-600 text-xl font-semibold pb-6">Redes</h1>
                                    <div className="flex gap-3">
                                        <a href="https://www.facebook.com/leomessi/about" target="_blank" rel="noopener noreferrer"><FaFacebook style={{ color: "white", width: 30, height: 30 }} /></a>
                                        <a href="https://www.instagram.com/leomessi/" target="_blank" rel="noopener noreferrer"><FaInstagram style={{ color: "white", width: 30, height: 30 }} /></a>
                                        <a href="https://x.com/Messismo10" target="_blank" rel="noopener noreferrer"><FaTwitter style={{ color: "white", width: 30, height: 30 }} /></a>
                                    </div><br />
                                </div>
                            </div><hr />
                        </div>
                    </div>
                    <div className="flex justify-center pb-5 pt-3">
                        <div className="w-4/5">
                            <p className="footer-copy text-white">Copyright &copy; 2024 Alta-Kassa</p>
                        </div>
                    </div>
                </footer>
            </div >
        </>
    )
}
export default LandingPage