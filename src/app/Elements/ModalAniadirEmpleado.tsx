import {  useState } from 'react';

type Props = {
    setShowAniadirEmpleado: (...args: any[]) => void;
    handleAniadirEmpleado: (...args: any[]) => void;
}

type Empleado = {
    Id_Empleado: string;
    nombre: string;
    tieneAcceso: boolean;
    proximoHorario: number,
}
export const ModalAniadirEmpleado = ({setShowAniadirEmpleado, handleAniadirEmpleado }: Props): JSX.Element => {
    const [ showAlert,  setShowAlert ] = useState(false);
    const [ mensajeAlert,  setMensajeAlert ] = useState('');

    const [ Id_Empleado, setId_Empleado ] = useState('');
    const [ nombre, setNombre ] = useState('');
    const [ tieneAcceso, setTieneAcceso ] = useState('false');
    const [ proximoHorario, setProximoHorario ] = useState('7');

    const handleAceptar  = () => {

        if (Id_Empleado.length === 4) {
            if (nombre.length > 4) {
                if (tieneAcceso === "true" || tieneAcceso === "false") {
                    if (proximoHorario === "7" || proximoHorario === "14") {
                        const newEmpleado = {      
                            Id_Empleado: Id_Empleado,
                            nombre: nombre,
                            tieneAcceso: tieneAcceso === "true", // true o false booleano
                            proximoHorario: Number (proximoHorario),
                        };                        
                        handleAniadirEmpleado(newEmpleado);
                        setShowAniadirEmpleado(false);
                    } else {
                        setShowAlert(true);
                        setMensajeAlert('Error en horario');                        
                    }
                } else {
                    setShowAlert(true);
                    setMensajeAlert('Error en acceso');                    
                }
            } else {
                setShowAlert(true);
                setMensajeAlert('Error en nombre');                
            }
        } else {
            setShowAlert(true);
            setMensajeAlert('Error en id');            
        }
                
    }
    return (
        <>
        <div className='containerModal'>
            <div className='innerModal'>
                <div className='titulo'>
                    <h3>Añadir empleado</h3>
                </div>
                <div className='input'>
                    <input 
                        type="text" 
                        placeholder='Id_Empleado' 
                        className='input-1'
                        autoComplete="off"
                        minLength={4}
                        maxLength={4}
                        value={ Id_Empleado }
                        onChange={ (event) => setId_Empleado(event.target.value) }/>
                </div>
                <div className='input'>
                    <input 
                        type="text" 
                        placeholder='Nombre' 
                        className='input-1'
                        autoComplete="off"
                        minLength={4}
                        maxLength={32}
                        value={ nombre }
                        onChange={ (event) => setNombre(event.target.value) }/>
                </div>
                <div className='input'>
                    <p>¿Tiene acceso?</p>
                    <select
                        className='select-1'
                        name="Acceso"
                        value={ tieneAcceso }
                        onChange={ (event) => setTieneAcceso(event.target.value) }>
                            <option value="true">Si</option>
                            <option value="false" >No</option>
                    </select>
                </div>
                <div className='input'>
                    <p>Horario</p>
                    <select
                        className='select-1'
                        name="Acceso"
                        value={ proximoHorario }
                        onChange={ (event) => setProximoHorario(event.target.value) }>
                            <option value="7" >07:00 - 09:00</option>
                            <option value="14">14:00 - 16:00</option>
                    </select>
                </div>
                <div className='boton'>
                    <button className='boton-1' onClick={ ()=> handleAceptar() }>Aceptar</button>
                </div>
                <div className='boton'>
                    <button className='boton-1' onClick={ ()=> setShowAniadirEmpleado(false) }>Cerrar</button>
                </div>
            </div>
        </div>
        { showAlert && 
            <div className='containerModal'>
            <div className='innerModal'>
                <div className='titulo'>
                    <h3>{mensajeAlert}</h3>
                </div>
                <div className='boton'>
                    <button className='boton-1' onClick={ ()=> setShowAlert(false) }>Aceptar</button>
                </div>
            </div>
        </div>
        }
        </>
    )
}