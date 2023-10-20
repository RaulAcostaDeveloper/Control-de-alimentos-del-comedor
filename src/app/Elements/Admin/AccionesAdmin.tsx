import { useState } from "react";
import { Candy } from "../Candys/Candy"
import { TablaEmpleados } from "./TablaEmpleados";
import { setActualPosicion } from "../Candys/CandyContainer";
import { aniadirEmpleado, empleados, filtraPorId } from "@/app/Constants/CrudEmpleados";
import { ModalAniadirEmpleado } from "./ModalAniadirEmpleado";
import { SegundoModal } from "./SegundoModal";
import { ModalEliminarEmpleado } from "./ModalEliminarEmpleado";

// ACCIONES CRUD
type Empleado = {
    Id_Empleado: string;
    nombre: string;
    tieneAcceso: boolean;
    proximoHorario: number,
}


export const AccionesAdmin = (): JSX.Element => {
    const [ showList, setShowList ] = useState(false);
    const [ filtroNombre, setFiltroNombre ] = useState('');
    
    // Modales
    const [ showModalAniadirEmpleado, setShowModalAniadirEmpleado ] = useState(false);
    const [ showModalEliminarEmpleado, setShowModalEliminarEmpleado ] = useState(false);
    const [ showSegundoModal, setShowSegundoModal] = useState(false);
    const [ textSegundoModal, setTextSegundoModal ] = useState('');

    // Handle modales
        // open
    const handleOpenModalAniadirEmpleado = () => {
        setActualPosicion({ columna: 7, fila: 1} )
        setShowModalAniadirEmpleado(true);
    }
    const handleCloseModalAniadirEmpleado = () => {
        // ERROR
        // Si se da click, no actualiza la posición
        setActualPosicion({ columna: 4, fila: 1} )
        setShowModalAniadirEmpleado(false);
    }
    const handleOpenModalEliminarEmpleado = () => {
        setActualPosicion({ columna: 13, fila:  1} );
        setShowModalEliminarEmpleado(true);
    }
        // close
    const handleCloseModalEliminarEmpleado = () => {
        // ERROR
        // Si se da click, no actualiza la posición
        
        setActualPosicion({ columna: 5, fila:  1} );
        setShowModalEliminarEmpleado(false);
    }
    const handleCloseSegundoModal = () => {
        setShowSegundoModal(false);
    }

    return (
        <div>
            <div className='cuadroDeAcciones'>
                <p>Acciones</p>
            </div>
            <div className="contenedorBotonMostrar" id='botonMostrarLista'>
                <Candy 
                    posicion={ [2,1] }
                    onEnter={ () => setShowList(true) }>
                    <button className="boton-1" onClick={ () => setShowList(true) }>Mostrar lista de empleados</button>
                </Candy>
            </div>
            <div className="contenedorBotonMostrar" id='botonOcultarLista'>
                <Candy 
                    posicion={ [3,1] }
                    onEnter={ () => setShowList(false) }>
                    <button className="boton-1" onClick={ () => setShowList(false) }>Ocultar lista de empleados</button>
                </Candy>
            </div>
            {/* Acciones de la tabla */}
            { showList && 
                <div className="listaEmpleados">
                    <div className='cuadroDeAcciones'>
                        <Candy
                            posicion={ [4,1] }
                            onEnter={ handleOpenModalAniadirEmpleado }>
                            <button className="boton-1" onClick={ () => handleOpenModalAniadirEmpleado() }>Añadir empleado</button>
                        </Candy>
                        <Candy
                            posicion={ [5,1] }
                            onEnter={ handleOpenModalEliminarEmpleado }>
                            <button className="boton-1" onClick={ () => handleOpenModalEliminarEmpleado() }>Eliminar empleado</button>
                        </Candy>
                    </div>
                    <div className='filtro'>
                        <Candy
                            posicion={ [6,1] }
                            idInput='input_empleados-filtro'>
                            <input
                                id='input_empleados-filtro'
                                className='input-2'
                                type="text" 
                                placeholder='Filtro por nombre'
                                value={ filtroNombre }
                                onChange={ (event) => setFiltroNombre(event.target.value) }/>
                        </Candy>
                    </div>
                </div>
            }
            {/* Tabla */}
            { showList && 
                <TablaEmpleados filtro={ filtroNombre }/>
            }

            {/* Modales */}
            { showModalAniadirEmpleado && 
                <ModalAniadirEmpleado
                    handleCloseModalAniadirEmpleado = { handleCloseModalAniadirEmpleado }/>
            }
            { showModalEliminarEmpleado && 
                <ModalEliminarEmpleado
                    handleCloseModalEliminarEmpleado = { handleCloseModalEliminarEmpleado }/>
            }
            { showSegundoModal && 
                <SegundoModal 
                    textSegundoModal = { textSegundoModal }
                    handleCloseSegundoModal = { () => handleCloseSegundoModal() }/>
            }
        </div>
    )
}