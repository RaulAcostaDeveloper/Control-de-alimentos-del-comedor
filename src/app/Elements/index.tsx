'use client'
import { useEffect, useState } from 'react'
import '../Styles/Candys.css';
import '../Styles/EmpleadosList.css';
import '../Styles/Global.css';
import '../Styles/MainAdmin.css';
import '../Styles/MainEmpleado.css';
import '../Styles/Modales.css';
import '../Styles/AdviceBox.css';
import { Login } from "./Login"
import { MainAdmin } from './Admin/MainAdmin'
import { MainEmpleado } from './Empleado/MainEmpleado'
import { AdviceBox } from './AdviceBox/AdviceBox';
import { openACandyModal, reiniciaPosicionInicial, setActualPosicion } from './Candys/CandyContainer';

const advices = [
    "Use arrows to navigate trow the interface.",
    "Use Enter Key to click a button.",
    "Use Enter Key to enter in an input and press again go out of the input."
];
export const Index = (): JSX.Element => {
    const [ showLogin, setShowLogin ] = useState(true);
    const [ isLoggedAdmin, setIsLoggedAdmin ] = useState(false);
    const [ showAdvice, setShowAdvice] = useState(true);
    useEffect(()=>{
        setActualPosicion({columna:1,fila:1});
    },[]);
    const handleLogin = (isAdmin: boolean) => {        
        setShowLogin(false);
        setIsLoggedAdmin(isAdmin);   
        if (isAdmin) {
        }
    }
    const handleCloseAdvice = () => {
        setShowAdvice(false);
        setActualPosicion({columna:3,fila:1});
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
                        <MainAdmin openLogin = { () => {setShowLogin(true); setActualPosicion({columna:3,fila:1}); }}/> 
                        : 
                        <MainEmpleado openLogin = { () => {setShowLogin(true); setActualPosicion({columna:3,fila:1}); }}/> }
                </>
            }
            { showAdvice && <AdviceBox advices={advices} callback = { handleCloseAdvice }/> }
        </div>
    )
}