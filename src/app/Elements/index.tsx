'use client'
import { useState } from 'react'
import '../Styles/Global.css';
import '../Styles/Candys.css';
import { Login } from "./Login"
import { MainAdmin } from './MainAdmin'
import { MainEmpleado } from './MainEmpleado'

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