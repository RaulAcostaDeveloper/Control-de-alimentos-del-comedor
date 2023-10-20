import { useEffect, useState } from 'react';
import { CandyContainer, getUltimaColumna, openACandyModal, reiniciaPosicionInicial } from './Candys/CandyContainer';
import { Candy } from './Candys/Candy';
type Props = {
    handleLogin:(...args: any[]) => void;
}
const adminUserName = 'admin';
const adminUserPassword = '1234';
let adminInput = '';
let passwordInput = '';
export const Login = ({ handleLogin }: Props): JSX.Element => {
    const [ inputUsuarioValue, setInputUsuarioValue ] = useState('');
    const [ inputPasswordValue, setInputPasswordValue ] = useState('');
    const [ showModalInfo, setShowModalInfo ] = useState(false);

    useEffect(()=> {
        adminInput = inputUsuarioValue;
        passwordInput = inputPasswordValue;
    }, [inputUsuarioValue, inputPasswordValue]);

    const handleTryLogin = () => {    
        // Por alguna razón, si se entra a esta función a través del Candy, los estados son los iniciales.
        // Por eso tuve que usar variables fuera del componente.
        setInputUsuarioValue('');
        setInputPasswordValue('');
        if (adminInput === adminUserName && passwordInput === adminUserPassword) {
            reiniciaPosicionInicial();
            handleLogin(true);
        } else {
            openACandyModal(getUltimaColumna());
            setShowModalInfo(true);
        }
    }
    const handleCloseModalInfo = () => {
        reiniciaPosicionInicial();
        setShowModalInfo(false);
    }
    const handleLogEmpleado = () => {
        reiniciaPosicionInicial();
        handleLogin(false);
    }
    return (
        <>
        <CandyContainer>
            <div className="containerModal">
                <div className="innerModal">
                    <div className='titulo'> 
                        <h2>Login</h2>
                        <p>Login del usuario administrador</p>
                    </div>
                    <div className='input'>
                        <Candy
                            className='CandyContainer'
                            posicion={[1,1]}
                            idInput='input_login-usuario'>
                            <input 
                                id='input_login-usuario'
                                type="text" 
                                placeholder='Usuario' 
                                className='input-1'
                                autoComplete="off"
                                value={ inputUsuarioValue }
                                onChange={ (event) => setInputUsuarioValue(event.target.value) }/>
                        </Candy>
                    </div>
                    <div className='input'>
                        <Candy
                            className='CandyContainer'
                            posicion={[2,1]}
                            idInput='input_login-password'>
                            <input
                                id='input_login-password'
                                type="password" 
                                placeholder='Contraseña' 
                                className='input-1'
                                autoComplete="off"
                                value={ inputPasswordValue }
                                onChange={ (event) => setInputPasswordValue(event.target.value) }/>
                        </Candy>
                    </div>
                    <div className='boton'>
                        <Candy
                            className='CandyContainer'
                            posicion={[3,1]}
                            onEnter={ () => handleTryLogin() }>
                            <button className='boton-1' onClick={ () => handleTryLogin() }>Ingresar</button>
                        </Candy>
                    </div>
                        
                    <div className='boton'>
                        <p className='adminq'>¿No eres administrador?</p>
                        <Candy
                            className='CandyContainer'
                            posicion={[4,1]}
                            onEnter={ () => handleLogEmpleado() }>
                            <button className='boton-1' onClick={ () => handleLogEmpleado() }>Soy empleado</button>
                        </Candy>
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
                        <Candy
                            className='CandyContainer'
                            posicion={[5,1]}
                            onEnter={ ()=> handleCloseModalInfo() }>
                            <button className='boton-1' onClick={ ()=> handleCloseModalInfo() }>Aceptar</button>
                        </Candy>
                        </div>
                    </div>
                </div>
            }
        </CandyContainer>
        </>
    )
}