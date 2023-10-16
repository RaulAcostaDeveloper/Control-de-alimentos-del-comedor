type Props = {
    openLogin:(...args: any[]) => void;
}
import { useState } from 'react';
import '../Styles/MainEmpleado.css';
import '../Styles/Modales.css';
import { empleados } from './EmpleadosList';

  const getPosicionUsuario = (idEmpleado: string) => {
    for (let i = 0; i < empleados.length; i++) {
      if (empleados[i].Id_Empleado === idEmpleado) {
        return i; // Retorna la posición si se encuentra el usuario
      }
    }
    return -1; // Retorna -1 si el usuario no se encuentra en el array
  }
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
        const posicionUsuario = getPosicionUsuario(idEmpleado);
        let opcion = obtenerOptionModal(posicionUsuario);
       
        switch (opcion) {
            case 0:
                setTituloModalActual('No se encontró el usuario');
                setTextoModalActual('');
                setsegundoTextoModalActual('');
                setIdEmpleado('');
                setShowModalEmpleado(true);
                break;
            case 1:
                setTituloModalActual('Bienvenido');
                setTextoModalActual('');
                setsegundoTextoModalActual('');
                setIdEmpleado('');
                setShowModalEmpleado(true);
                break;
            case 2:
                setTituloModalActual('Acceso denegado');
                setTextoModalActual('Su horario de acceso al comedor es de');
                const horarioEntrada = empleados[posicionUsuario].proximoHorario;
                const horarioSalida = horarioEntrada + 2;
                const proximoAcceso = '' + horarioEntrada + ':00' + ' a ' + horarioSalida + ':00'
                setsegundoTextoModalActual(proximoAcceso);
                setIdEmpleado('');
                setShowModalEmpleado(true);
                break;
            case 3:
                setTituloModalActual('Acceso denegado');
                setTextoModalActual('Usted no tiene acceso al area del comedor');
                setsegundoTextoModalActual('Solicite acceso a RH');
                setIdEmpleado('');
                setShowModalEmpleado(true);
                break;
            default:
                break;
        }
    }
    return (
        <div className="mainEmpleado">
            <div className='tituloMain'>
                <h2>Empleados</h2>
            </div>
            <button onClick={()=> openLogin() } className="boton-2 boton-flotante">Login</button>
            <div className="containerForm">
                <div className="formEmpleado">
                    <input 
                        type="text" 
                        placeholder="Ingresa tu id de empleado" 
                        className='input-1'
                        value={ idEmpleado }
                        onChange={ (event) => setIdEmpleado(event.target.value) }/>
                    <button className='boton-1' onClick={ ()=> handleSolicitarAcceso() }>Solicitar Acceso</button>
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
                            <button className='boton-1' onClick={ ()=> setShowModalEmpleado(false) }>Aceptar</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}