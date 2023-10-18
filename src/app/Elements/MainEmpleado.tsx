type Props = {
    openLogin:(...args: any[]) => void;
}
import { useEffect, useState } from 'react';
import '../Styles/MainEmpleado.css';
import '../Styles/Modales.css';
import { empleados } from './EmpleadosList';
import { CandyContainer, getUltimaColumna, openACandyModal, reiniciaPosicionInicial } from './Candys/CandyContainer';
import { Candy } from './Candys/Candy';

const getPosicionUsuario = (idEmpleado: string) => {
    for (let i = 0; i < empleados.length; i++) {
        if (empleados[i].Id_Empleado === idEmpleado) {
        return i; // Retorna la posición si se encuentra el usuario
        }
    }
    return -1; // Retorna -1 si el usuario no se encuentra en el array
}
let idEmpleadoValue = '';
export const MainEmpleado = ({ openLogin }: Props): JSX.Element => {
    const [ idEmpleado, setIdEmpleado ] = useState('');
    const [ showModalEmpleado, setShowModalEmpleado ] = useState(false);
    const [ tituloModalActual, setTituloModalActual ] = useState('');
    const [ empleadoActual, setEmpleadoActual ] = useState('');
    const [ textoModalActual, setTextoModalActual ] = useState('');
    const [ segundoTextoModalActual, setsegundoTextoModalActual ] = useState('');

    const obtenerOptionModal = (posicionUsuario: number) => {
        const fechaActual = new Date();
        const horaActual = fechaActual.getHours();
        setEmpleadoActual('');
        if (posicionUsuario !== -1) {
            setEmpleadoActual(empleados[posicionUsuario].nombre);
            if (empleados[posicionUsuario].tieneAcceso) {
                const horarioEntrada = empleados[posicionUsuario].proximoHorario;
                const horarioSalida = horarioEntrada + 2;
                if (horaActual >= horarioEntrada && horaActual < horarioSalida) {
                    // Acceso
                    console.log('está en el horario');
                    return 1;
                } else {
                    // No está en el horario
                    return 2;
                }
            } else {
                // No tiene acceso
                return 3;
            }
        } else {
            // No se encontró
            return 0;
        }
    }
    const handleSolicitarAcceso = () => {
        const posicionUsuario = getPosicionUsuario(idEmpleadoValue);
        let opcion = obtenerOptionModal(posicionUsuario);
       
        switch (opcion) {
            case 0:
                setTituloModalActual('No se encontró el usuario');
                setTextoModalActual('');
                setsegundoTextoModalActual('');
                setIdEmpleado('');
                break;
            case 1:
                setTituloModalActual('Bienvenido');
                setTextoModalActual('');
                setsegundoTextoModalActual('');
                setIdEmpleado('');
                break;
            case 2:
                setTituloModalActual('Acceso denegado');
                setTextoModalActual('Su horario de acceso al comedor es de');
                const horarioEntrada = empleados[posicionUsuario].proximoHorario;
                const horarioSalida = horarioEntrada + 2;
                const proximoAcceso = '' + horarioEntrada + ':00' + ' a ' + horarioSalida + ':00'
                setsegundoTextoModalActual(proximoAcceso);
                setIdEmpleado('');
                break;
            case 3:
                setTituloModalActual('Acceso denegado');
                setTextoModalActual('Usted no tiene acceso al area del comedor');
                setsegundoTextoModalActual('Solicite acceso a RH');
                setIdEmpleado('');
                break;
            default:
                break;
            }
        
        openACandyModal(getUltimaColumna());
        setShowModalEmpleado(true);
    }

    const handleClodeModal  = () => {
        reiniciaPosicionInicial();
        setShowModalEmpleado(false);
    }
    useEffect(()=>{
        idEmpleadoValue = idEmpleado;
    },[idEmpleado])
    return (
        <CandyContainer>
            <div className="mainEmpleado">
                <div className='tituloMain'>
                    <h2>Empleados</h2>
                </div>
                <div className='boton-flotante'>
                    <Candy 
                        posicion={[1,1]}
                        onEnter={ openLogin }>
                        <button onClick={()=> openLogin() } className="boton-2">Login</button>
                    </Candy>
                </div>
                <div className="containerForm">
                    <div className="formEmpleado">
                        <Candy
                            posicion={ [2,1] }
                            className='CandyContainer'
                            idInput='input_empleado-idEmpleado'>
                            <input
                                id='input_empleado-idEmpleado'
                                type="text" 
                                placeholder="Ingresa tu id de empleado" 
                                className='input-1'
                                value={ idEmpleado }
                                onChange={ (event) => setIdEmpleado(event.target.value) }/>
                        </Candy>
                        <Candy
                            posicion={ [3,1] }
                            className='CandyContainer'
                            onEnter={ handleSolicitarAcceso }>
                            <button className='boton-1' onClick={ ()=> handleSolicitarAcceso() }>Solicitar Acceso</button>
                        </Candy>
                    </div>
                </div>
                { showModalEmpleado &&
                    <div className='containerModal'>
                        <div className='innerModal'>
                            <div className='titulo'>
                                <h3>{tituloModalActual}</h3>
                            </div>
                            <div className='texto'>
                                {empleadoActual}
                            </div>
                            <div className='texto'>
                                <b>{textoModalActual}</b>
                            </div>
                            <div className='texto'>
                                {segundoTextoModalActual}
                            </div>
                            <div className='boton'>
                                <Candy 
                                    posicion={ [4,1] }
                                    onEnter={ handleClodeModal }>
                                    <button className='boton-1' onClick={ ()=> handleClodeModal() }>Aceptar</button>
                                </Candy>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </CandyContainer>
    )
}