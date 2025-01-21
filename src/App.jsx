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
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='/'>
          <Route path='login' element={<Login />} />
          <Route path='registro' element={<Registro />} />
          <Route path='recuperar' element={<Recuperar />} />
          <Route path='confirmar/:token' element={<Confirmar />} />
          <Route path='restablecer/:token' element={<Restablecer />} />
        </Route>


        <Route path='dashboard/*' element={
          <PrivateRoutes>
            <Routes>
              <Route element={<Dashboard />}>
                <Route index element={<Inicio />} />
              </Route>
            </Routes>
          </PrivateRoutes>
        }>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
