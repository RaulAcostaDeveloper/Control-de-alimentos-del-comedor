import { useEffect, useState } from 'react';
import '../Styles/EmpleadosList.css';
import { ModalAniadirEmpleado } from './ModalAniadirEmpleado';
import { Candy } from './Candys/Candy';
import { setActualPosicion } from './Candys/CandyContainer';

type Empleado = {
    Id_Empleado: string;
    nombre: string;
    tieneAcceso: boolean;
    proximoHorario: number,
}


export const empleados: Empleado[] = [
    {
      Id_Empleado: "4256",
      nombre: "Juan Pérez",
      tieneAcceso: true,
      proximoHorario: 7,
    },
    {
      Id_Empleado: "1234",
      nombre: "María López",
      tieneAcceso: true,
      proximoHorario: 14,
    },
    {
      Id_Empleado: "9876",
      nombre: "Pedro García",
      tieneAcceso: true,
      proximoHorario: 14,
    },
    {
      Id_Empleado: "5678",
      nombre: "Ana Martínez",
      tieneAcceso: true,
      proximoHorario: 7,
    },
    {
      Id_Empleado: "2345",
      nombre: "Luis Rodríguez",
      tieneAcceso: true,
      proximoHorario: 7,
    },
    {
      Id_Empleado: "7890",
      nombre: "Laura Gómez",
      tieneAcceso: false,
      proximoHorario: 14,
    },
    {
      Id_Empleado: "4567",
      nombre: "Carlos Sánchez",
      tieneAcceso: true,
      proximoHorario: 7,
    },
    {
      Id_Empleado: "3456",
      nombre: "Marcela Ramírez",
      tieneAcceso: true,
      proximoHorario: 7,
    },
    {
      Id_Empleado: "6789",
      nombre: "Diego Pérez",
      tieneAcceso: true,
      proximoHorario: 7,
    },
    {
      Id_Empleado: "8901",
      nombre: "Sofía López",
      tieneAcceso: false,
      proximoHorario: 14,
    },
    // Agrega más empleados aquí...
];
const aniadirEmpleado = (data: Empleado) => {
    empleados.push(data);
}
const filtraPorNombre = (filtro: string) => {
    const empleadosFiltrados = empleados.filter((empleado) => {
        return empleado.nombre.toLowerCase().includes(filtro.toLowerCase());
      });
      return empleadosFiltrados;
}
const filtraPorId = (filtro: string) => {
    let indice = 0;
    const empleadosFiltrados = empleados.filter((empleado, index) => {
        if (empleado.Id_Empleado.toLowerCase().includes(filtro.toLowerCase())) {
            indice= index;
            return true
        }
    });
      
    return {
        empleadosFiltrados,
        indice,
    };
}
const eliminarEmpleado = (index:  number) =>  {
    empleados.splice(index, 1);
}
let idEliminarForm  = '';
export const EmpleadosList = (): JSX.Element => {
    const [ empleadosLista, setEmpleadosLista ] = useState(empleados);
    const [ showAniadirEmpleado, setShowAniadirEmpleado ] = useState(false);
    const [ showEliminarEmpleado, setShowEliminarEmpleado ] = useState(false);
    const [ idEliminar,  setIdEliminar ] = useState('');
    const [ showAlertModal, setShowAlertModal] = useState(false);
    const [ textAlertModal, setTextAlertModal ] = useState('');
    const [ filtroNombre, setFiltroNombre ] = useState('');

    useEffect(()=> {
        idEliminarForm = idEliminar;
    } ,[idEliminar]);

    useEffect(()=> {
        if (filtroNombre) {
            const arr = filtraPorNombre(filtroNombre);
            setEmpleadosLista(arr)
        } else {
            setEmpleadosLista(empleados);
        }
    },[filtroNombre]);

    const handleOpenModalAniadirEmpleado = () => {
        setActualPosicion({ columna: 7, fila: 1} )
        setShowAniadirEmpleado(true);
    }

    const handleAniadirEmpleado = (newEmpleado: Empleado) => {
        const objFiltrado = filtraPorId(newEmpleado.Id_Empleado);
        if (objFiltrado.empleadosFiltrados.length ===  0) {
            aniadirEmpleado(newEmpleado);
            const obj = empleados.map((el)=>el);
            setEmpleadosLista(obj);
            setActualPosicion({ columna: 4, fila:  1} );
            setShowAniadirEmpleado(false);
        } else {
            setActualPosicion({ columna: 12, fila:  1} );
            setShowAlertModal(true);
            setTextAlertModal('Ya existe el empleado')
        }
    }

    const handleEliminarEmpleado = () =>  {
        if (idEliminarForm.length === 4) {
            const empleadoAEliminar  =  filtraPorId(idEliminarForm);            
            if (empleadoAEliminar.empleadosFiltrados.length > 0) {
                eliminarEmpleado(empleadoAEliminar.indice);
                setIdEliminar('');
                setShowAlertModal(true);
                setTextAlertModal('Se eliminó al empleado ' + empleadoAEliminar.empleadosFiltrados[0].nombre); 
            }  else  {
                setShowAlertModal(true);
                setTextAlertModal('No se encontró el empleado con  el id ' + idEliminarForm);           
            }
            setActualPosicion({ columna: 12, fila:  1} );
        }
    }

    const handleCloseAlertModal = () => {
        if (showAniadirEmpleado || showEliminarEmpleado) {
            if (showAniadirEmpleado) {
                setActualPosicion({ columna: 7, fila:  1} );
            }
            if (showEliminarEmpleado) {
                setActualPosicion({ columna: 13, fila:  1} );
            }
        } else {
            handleCloseModalEliminarEmpleado();
        }
        setShowAlertModal(false);
    }

    const handleOpenModalEliminarEmpleado = () => {
        setActualPosicion({ columna: 13, fila:  1} );
        setShowEliminarEmpleado(true);
    }
    const handleCloseModalEliminarEmpleado = () => {
        setActualPosicion({ columna: 5, fila:  1} );
        setShowEliminarEmpleado(false);
    }

    return (
        <>
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
            { showAniadirEmpleado && 
                <ModalAniadirEmpleado
                    setShowAniadirEmpleado = { setShowAniadirEmpleado }
                    handleAniadirEmpleado = { handleAniadirEmpleado }/>
            }
            { showEliminarEmpleado && 
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
                                onEnter={ handleEliminarEmpleado }>
                                <button className='boton-1' onClick={ () => handleEliminarEmpleado() }>Aceptar</button>
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
            }
            { showAlertModal && 
                <div className="containerModal">
                    <div className="innerModal">
                        <div className='titulo'> 
                            <h3>{textAlertModal}</h3>
                        </div>
                        <div className='boton'>
                            <Candy
                                posicion={ [12, 1] }
                                onEnter={ handleCloseAlertModal }>
                                <button className='boton-1' onClick={ () => handleCloseAlertModal() }>Aceptar</button>
                            </Candy>
                        </div>
                    </div>
                </div>
            }
            <div className="empleadosList">
                <div className="tabla">
                    <div className='registro encabezado'>
                        <div className="seccion ">
                            Id_Empleado
                        </div>
                        <div className="seccion">
                            Nombre
                        </div>
                        <div className="seccion">
                            Acceso al comedor
                        </div>
                        <div className="seccion">
                            Horario del comedor
                        </div>
                    </div>
                    { empleadosLista.map( (empleado)=> 
                        <div key={empleado.Id_Empleado} className="registro empleado"> 
                            <div className="seccion">
                                { empleado.Id_Empleado }
                            </div>
                            <div className="seccion">
                                { empleado.nombre }
                            </div>
                            <div className="seccion">
                                { empleado.tieneAcceso ? <div>Si</div> : <div>No</div>  }
                            </div>
                            <div className="seccion">
                                { empleado.proximoHorario }:00 a { empleado.proximoHorario + 2 }:00
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}