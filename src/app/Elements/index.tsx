'use client'
import { useState } from 'react'
import '../Styles/Candys.css';
import '../Styles/EmpleadosList.css';
import '../Styles/Global.css';
import '../Styles/MainAdmin.css';
import '../Styles/MainEmpleado.css';
import '../Styles/Modales.css';
import { Login } from "./Login"
import { MainAdmin } from './Admin/MainAdmin'
import { MainEmpleado } from './Empleado/MainEmpleado'

export const Index = (): JSX.Element => {
    const [ showLogin, setShowLogin ] = useState(true);
    const [ isLoggedAdmin, setIsLoggedAdmin ] = useState(false);
    const handleLogin = (isAdmin: boolean) => {        
        setShowLogin(false);
        setIsLoggedAdmin(isAdmin);   
        if (isAdmin) {
        }
    }
    return (
        <div>
            <div className='tituloApp'>
                <h1> Control de alimentos del comedor</h1>
            </div>
            {showLogin ?
                <Login handleLogin = { handleLogin }/>
                :
                <>
                    { isLoggedAdmin ? 
                        <MainAdmin openLogin = { () => setShowLogin(true) }/> 
                        : 
                        <MainEmpleado openLogin = { () => setShowLogin(true) }/> }
                </>
            }
        </div>
    )
}