import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Recuperar from './paginas/RecuperarContra'
import LandingPage from './paginas/LandinPage'
import Dashboard from './paginas/Dashboard'
import Confirmar from './paginas/Confirmar'
import Restablecer from './paginas/Restablecer'
import PrivateRoutes from './routes/PrivateRoutes'
import Configuracion from './paginas/Cli-Prov/Configuracion'
import InicioProve from './paginas/Proveedor/InicioProv'
import PrivateProveedor from './routes/PrivateProveedor'
import ListadoOfertas from './paginas/Proveedor/MisOfertas'
import HistorialTrabajoCli from './paginas/Cliente/HistorialTrabajosCli'
import SolicitudProv from './paginas/Proveedor/SolicitudesProv'
import PaginaNoPermitida from './paginas/PaginaNoPermitida'
import RutasProveedor from './routes/RutasProveedor'
import RutasCliente from './routes/RutasClientes'
import Auth from './routes/Auth'
import SolicitudesCli from './paginas/Cliente/SolicitudesCliente'
import ContratosCliente from './paginas/Cliente/ContratosCliente'
import ContratosProv from './paginas/Proveedor/ContratosProveedor'
import NotFound from './paginas/NotFound'
import Sugerencias from './paginas/Cli-Prov/Sugerencias'
import RutasCliProv from './routes/RutasCli-Pro'
import AppInit from './context/AppInit'
import EsqueletoOfertas from './paginas/Esqueletos/EsqOfertas'
import HistorialTrabajoProvs from './paginas/Proveedor/HistorialProv'
import InicioAdmin from './paginas/admin/InicioAdmin'
import RutasAdmin from './routes/PrivateAdmin'
import VerSugerencias from './paginas/admin/VerSugerencias'
import PlanesdePago from './paginas/admin/Pagos'
function App() {

  return (
    <BrowserRouter>
      <AppInit>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path='/' element={<Auth />}>
            <Route path='login' element={<Login />} />
            <Route path='registro' element={<Registro />} />
            <Route path='recuperar' element={<Recuperar />} />
            <Route path='confirmar/:token' element={<Confirmar />} />
            <Route path='restablecer/:token' element={<Restablecer />} />
            <Route path='*' element={<NotFound />} />
          </Route>
          <Route path='dashboard/*' element={
            <PrivateRoutes>
              <Routes>
                <Route element={<Dashboard />}>
                  <Route index element={
                    <PrivateProveedor>
                      <InicioProve />
                    </PrivateProveedor>
                  } />
                  <Route path='ofertas' element={
                    <RutasProveedor>
                      <ListadoOfertas />
                    </RutasProveedor>
                  } />

                  <Route path='solicitudes/proveedor' element={
                    <RutasProveedor>
                      <SolicitudProv />
                    </RutasProveedor>
                  } />

                  <Route path='contratos/proveedor' element={
                    <RutasProveedor>
                      <ContratosProv />
                    </RutasProveedor>
                  } />

                  <Route path='historialProveedor' element={
                    <RutasProveedor>
                      <HistorialTrabajoProvs />
                    </RutasProveedor>
                  } />

                  <Route path='historialCliente' element={
                    <RutasCliente>
                      <HistorialTrabajoCli />
                    </RutasCliente>
                  } />

                  <Route path='solicitudes/cliente' element={
                    <RutasCliente>
                      <SolicitudesCli />
                    </RutasCliente>
                  } />
                  <Route path='contratos/cliente' element={
                    <RutasCliente>
                      <ContratosCliente />
                    </RutasCliente>
                  } />
                  <Route path='sugerencias' element={
                    <RutasCliProv>
                      <Sugerencias />
                    </RutasCliProv>
                  } />

                  <Route path='ver-sugerencias' element={
                    <RutasAdmin>
                      <VerSugerencias />
                    </RutasAdmin>
                  } />

                  <Route path='planes-de-pago' element={
                    <RutasAdmin>
                      <PlanesdePago />
                    </RutasAdmin>
                  } />
                  
                  <Route path='configuracion' element={<Configuracion />} />
                  <Route path='no-encontrado' element={<PaginaNoPermitida />} />
                  <Route path='*' element={<NotFound />} />
                  <Route path='pruebas' element={<InicioAdmin />} />
                </Route>
              </Routes>
            </PrivateRoutes>
          }>
          </Route>
        </Routes>
      </AppInit>
    </BrowserRouter>
  )
}

export default App
