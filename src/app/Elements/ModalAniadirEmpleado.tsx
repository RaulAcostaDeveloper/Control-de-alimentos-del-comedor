import {  useEffect, useState } from 'react';
import { Candy } from './Candys/Candy';
import { setActualPosicion } from './Candys/CandyContainer';

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
let idForm = '';
let nombreForm = '';
let tieneAccesoForm = '';
let proximoHorarioForm = '';
export const ModalAniadirEmpleado = ({setShowAniadirEmpleado, handleAniadirEmpleado }: Props): JSX.Element => {
    const [ showAlert,  setShowAlert ] = useState(false);
    const [ mensajeAlert,  setMensajeAlert ] = useState('');

    const [ Id_Empleado, setId_Empleado ] = useState('');
    const [ nombre, setNombre ] = useState('');
    const [ tieneAcceso, setTieneAcceso ] = useState('false');
    const [ proximoHorario, setProximoHorario ] = useState('7');

    useEffect(()=>{
        idForm = Id_Empleado;
        nombreForm = nombre;
        tieneAccesoForm = tieneAcceso;
        proximoHorarioForm = proximoHorario;
    },[Id_Empleado, nombre, tieneAcceso, proximoHorario]);

    const handleAceptar  = () => {

        if (idForm.length === 4) {
            if (nombreForm.length > 4) {
                if (tieneAccesoForm === "true" || tieneAccesoForm === "false") {
                    if (proximoHorarioForm === "7" || proximoHorarioForm === "14") {
                        const newEmpleado = {      
                            Id_Empleado: idForm,
                            nombre: nombreForm,
                            tieneAcceso: tieneAccesoForm === "true", // true o false booleano
                            proximoHorario: Number (proximoHorarioForm),
                        };
                        handleAniadirEmpleado(newEmpleado);
                    } else {
                        setShowAlert(true);
                        setMensajeAlert('Error en horario');
                        setActualPosicion({ columna: 11, fila:  1} );
                    }
                } else {
                    setShowAlert(true);
                    setMensajeAlert('Error en acceso');
                    setActualPosicion({ columna: 11, fila:  1} );
                }
            } else {
                setShowAlert(true);
                setMensajeAlert('Error en nombre');
                setActualPosicion({ columna: 11, fila:  1} );
            }
        } else {
            setShowAlert(true);
            setMensajeAlert('Error en id');
            setActualPosicion({ columna: 11, fila:  1} );
        }
                
    }
    const handleCloseModal = () => {
        setActualPosicion({ columna: 4, fila:  1} );
        setShowAniadirEmpleado(false);
    }
    const handleCloseAlertModal = () => {
        setActualPosicion({ columna: 7, fila:  1} );
        setShowAlert(false);

    }
    return (
        <>
        <div className='containerModal'>
            <div className='innerModal'>
                <div className='titulo'>
                    <h3>Añadir empleado</h3>
                </div>
                <div className='input'>
                    <Candy
                        posicion={ [7,1] }
                        className='CandyContainer'
                        idInput='input_aniadirEmpleado-id'>
                        <input
                            id='input_aniadirEmpleado-id'
                            type="text"
                            placeholder='Id_Empleado'
                            className='input-1'
                            autoComplete="off"
                            minLength={ 4 }
                            maxLength={ 4 }
                            value={ Id_Empleado }
                            onChange={ (event) => setId_Empleado(event.target.value) }/>
                    </Candy>
                </div>
                <div className='input'>
                    <Candy
                        posicion={ [8,1] }
                        className='CandyContainer'
                        idInput='input_aniadirEmpleado-nombre'>
                        <input
                            id='input_aniadirEmpleado-nombre'
                            type="text"
                            placeholder='Nombre'
                            className='input-1'
                            autoComplete="off"
                            minLength={ 4 }
                            maxLength={ 32 }
                            value={ nombre }
                            onChange={ (event) => setNombre(event.target.value) }/>
                    </Candy>
                </div>
                <div className='input'>
                    <p>¿Tiene acceso?</p>
                    <select
                        id='select_aniadirEmpleado-acceso'
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
                    <Candy
                        posicion={ [9,1] }
                        onEnter={ handleAceptar }>
                        <button className='boton-1' onClick={ ()=> handleAceptar() }>Aceptar</button>
                    </Candy>
                </div>
                <div className='boton'>
                    <Candy
                        posicion={ [10,1] }
                        onEnter={ handleCloseModal }>
                        <button className='boton-1' onClick={ ()=> handleCloseModal() }>Cerrar</button>
                    </Candy>
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
                    <Candy
                        posicion={ [11,1] }
                        onEnter={ handleCloseAlertModal }>
                        <button className='boton-1' onClick={ ()=> handleCloseAlertModal() }>Aceptar</button>
                    </Candy>
                </div>
            </div>
        </div>
        }
        </>
    )
}