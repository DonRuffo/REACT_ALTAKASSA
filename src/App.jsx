import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Recuperar from './paginas/RecuperarContra'
import LandingPage from './paginas/LandinPage'
import Dashboard from './paginas/Dashboard'
import Inicio from './paginas/Inicio'
import Confirmar from './paginas/Confirmar'
import Restablecer from './paginas/Restablecer'
import PrivateRoutes from './routes/PrivateRoutes'
import { AuthProvider } from './context/AuthProvider'
import Configuracion from './paginas/Configuracion'
import { ConfigAuth } from './context/ConfigProvider'
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path='/'>
            <Route path='login' element={<Login />} />
            <Route path='registro' element={<Registro />} />
            <Route path='recuperar' element={<Recuperar />} />
            <Route path='confirmar/' element={<Confirmar />} />
            <Route path='restablecer/' element={<Restablecer />} />
          </Route>
          <Route path='dashboard/*' element={
            //<PrivateRoutes>
            <ConfigAuth>
              <Routes>
                <Route element={<Dashboard />}>
                  <Route index element={<Inicio />} />
                  <Route path='configuracion' element={<Configuracion />} />
                </Route>
              </Routes>
            </ConfigAuth>
            //</PrivateRoutes>
          }>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
