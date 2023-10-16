import { useState } from 'react';
import '../Styles/Modales.css';
type Props = {
    handleLogin:(...args: any[]) => void;
}
const adminUserName = 'admin';
const adminUserPassword = '1234';
export const Login = ({ handleLogin }: Props): JSX.Element => {
    const [ inputUsuarioValue, setInputUsuarioValue ] = useState('');
    const [ inputPasswordValue, setInputPasswordValue ] = useState('');
    const [ showModalInfo, setShowModalInfo ] = useState(false);
    const handleTryLogin = () => {
        setInputUsuarioValue('');
        setInputPasswordValue('');
        if (inputUsuarioValue === adminUserName && inputPasswordValue === adminUserPassword) {
            handleLogin(true);
        } else {
            setShowModalInfo(true);
        }
    }
    const handleLogEmpleado = () => {
        handleLogin(false);
    }
    return (
        <>
            <div className="containerModal">
                <div className="innerModal">
                    <div className='titulo'> 
                        <h2>Login</h2>
                        <p>Login del usuario administrador</p>
                    </div>
                    <div className='input'>
                        <input 
                            type="text" 
                            placeholder='Usuario' 
                            className='input-1'
                            autoComplete="off"
                            value={ inputUsuarioValue }
                            onChange={ (event) => setInputUsuarioValue(event.target.value) }/>
                    </div>
                    <div className='input'>
                        <input 
                            type="password" 
                            placeholder='Contraseña' 
                            className='input-1'
                            autoComplete="off"
                            value={ inputPasswordValue }
                            onChange={ (event) => setInputPasswordValue(event.target.value) }/>
                    </div>
                    <div className='boton'>
                        <button className='boton-1' onClick={ () => handleTryLogin() }>Ingresar</button>
                    </div>
                        
                    <div className='boton'>
                        <p className='adminq'>¿No eres administrador?</p>
                        <button className='boton-1' onClick={ () => handleLogEmpleado() }>Soy empleado</button>
                    </div>
                </div>
            </div>
            { showModalInfo && 
                <div className='containerModal'>
                    <div className='innerModal'>
                        <div className='titulo'>
                            <h3>No se encontró el usuario</h3>
                        </div>
                        <div className='texto'>
                            Para pruebas use admin 1234
                        </div>

                        <div className='boton'>
                            <button className='boton-1' onClick={ ()=> setShowModalInfo(false) }>Aceptar</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}