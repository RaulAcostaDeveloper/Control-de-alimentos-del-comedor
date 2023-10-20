import { useEffect, useState } from "react";
import { Candy } from "../Candys/Candy"
import { eliminarEmpleado, filtraPorId } from "@/app/Constants/CrudEmpleados";
import { setActualPosicion } from "../Candys/CandyContainer";
import { SegundoModal } from "./SegundoModal";
type Props = {
    handleCloseModalEliminarEmpleado: (...args: any[]) => void;
}
let idEliminarForm = '';
export const ModalEliminarEmpleado = ({ handleCloseModalEliminarEmpleado }: Props ): JSX.Element => {
    const [ idEliminar,  setIdEliminar ] = useState('');
    const [ showSegundoModal,  setShowSegundoModal ] = useState(false);
    const [ mensajeAlert,  setMensajeAlert ] = useState('');

    useEffect(()=>{
        idEliminarForm = idEliminar;
    },[idEliminar]);

    useEffect(()=>{
        setActualPosicion({ columna: 13, fila:  1} );
    },[])

    const handleAceptar = () =>  {
        setShowSegundoModal(true);
        setActualPosicion({ columna: 11, fila:  1} );
        if (idEliminarForm.length === 4) {
            const empleadoAEliminar = filtraPorId(idEliminarForm);            
            if (empleadoAEliminar.empleadosFiltrados.length > 0) {
                eliminarEmpleado(empleadoAEliminar.indice);
                setIdEliminar('');
                setMensajeAlert('Se eliminó al empleado ' + empleadoAEliminar.empleadosFiltrados[0].nombre); 
            } else  {
                setMensajeAlert('No se encontró el empleado con el id ' + idEliminarForm);
            }
        } else {
            setMensajeAlert('Error en id');
        }
    }

    const handleCloseAlertModal = () => {
        setActualPosicion({ columna: 13, fila:  1} );
        setShowSegundoModal(false);
    }
    return (
        <>
        <div className="containerModal">
            <div className="innerModal">
                <div className='titulo'> 
                    <h3>Eliminar  empleado</h3>
                </div>
                <div className='input'>
                    <Candy
                        posicion={ [13,1] }
                        idInput='input_eliminarEmpleado-id'
                        className='CandyContainer'>
                        <input
                            id='input_eliminarEmpleado-id'
                            type="text" 
                            placeholder='Id_Empleado a eliminar' 
                            className='input-1'
                            autoComplete="off"
                            minLength={4}
                            maxLength={4}
                            value={ idEliminar }
                            onChange={ (event) => setIdEliminar(event.target.value) }/>
                    </Candy>
                </div>
                <div className='boton'>
                    <Candy
                        posicion={ [14,1] }
                        onEnter={ handleAceptar }>
                        <button className='boton-1' onClick={ () => handleAceptar() }>Aceptar</button>
                    </Candy>
                </div>
                <div className='boton'>
                    <Candy
                        posicion={ [15,1] }
                        onEnter={ handleCloseModalEliminarEmpleado }>
                        <button className='boton-1' onClick={ () => handleCloseModalEliminarEmpleado() }>Cancelar</button>
                    </Candy>
                </div>
            </div>
        </div>
        { showSegundoModal && 
            <SegundoModal
                textSegundoModal = { mensajeAlert }
                handleCloseSegundoModal = { () => handleCloseAlertModal() } />
        }
        </>
    )
}