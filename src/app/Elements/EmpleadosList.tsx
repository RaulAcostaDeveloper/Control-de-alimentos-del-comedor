import { useEffect, useState } from 'react';
import '../Styles/EmpleadosList.css';
import { ModalAniadirEmpleado } from './ModalAniadirEmpleado';

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
export const EmpleadosList = (): JSX.Element => {
    const [ empleadosLista, setEmpleadosLista ] = useState(empleados);
    const [ showAniadirEmpleado, setShowAniadirEmpleado ] = useState(false);
    const [ showEliminarEmpleado, setShowEliminarEmpleado ] = useState(false);
    const [ idEliminar,  setIdEliminar ] = useState('');
    const [ showAlertModal, setShowAlertModal] = useState(false);
    const [ textAlertModal, setTextAlertModal ] = useState('');
    const [ filtroNombre, setFiltroNombre ] = useState('');

    useEffect(()=> {
        if (filtroNombre) {
            const arr = filtraPorNombre(filtroNombre);
            setEmpleadosLista(arr)
        } else {
            setEmpleadosLista(empleados);
        }
    },[filtroNombre]);

    const handleAniadirEmpleado = (newEmpleado: Empleado) => {
        const objFiltrado = filtraPorId(newEmpleado.Id_Empleado);
        if (objFiltrado.empleadosFiltrados.length ===  0) {
            aniadirEmpleado(newEmpleado);
            const obj = empleados.map((el)=>el);
            setEmpleadosLista(obj);
        } else {
            setShowAlertModal(true);
            setTextAlertModal('Ya existe el empleado')
        }
    }

    const handleEliminarEmpleado = () =>  {
        if (idEliminar.length === 4) {
            const empleadoAEliminar  =  filtraPorId(idEliminar);
            console.log('empleadoAEliminar ',  empleadoAEliminar);
            
            if (empleadoAEliminar.empleadosFiltrados.length > 0) {
                eliminarEmpleado(empleadoAEliminar.indice);
                setIdEliminar('');
                setShowEliminarEmpleado(false); 
                setShowAlertModal(true);
                setTextAlertModal('Se eliminó al empleado ' + empleadoAEliminar.empleadosFiltrados[0].nombre); 
            }  else  {
                setShowAlertModal(true);
                setTextAlertModal('No se encontró el empleado con  el id ' + idEliminar);           
            }
        }
    }

    return (
        <>
            <div className='cuadroDeAcciones'>
                <button className="boton-1" onClick={ () => setShowAniadirEmpleado(true) }>Añadir empleado</button>
                <button className="boton-1" onClick={ () => setShowEliminarEmpleado(true) }>Eliminar empleado</button>
            </div>
            <div className='filtro'>
                <input
                    className='input-2'
                    type="text" 
                    placeholder='Filtro por nombre'
                    value={ filtroNombre }
                    onChange={ (event) => setFiltroNombre(event.target.value) }
                    />
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
                            <input 
                                type="text" 
                                placeholder='Id_Empleado a eliminar' 
                                className='input-1'
                                autoComplete="off"
                                minLength={4}
                                maxLength={4}
                                value={ idEliminar }
                                onChange={ (event) => setIdEliminar(event.target.value) }/>
                        </div>
                        <div className='boton'>
                            <button className='boton-1' onClick={ () => handleEliminarEmpleado() }>Aceptar</button>
                        </div>
                        <div className='boton'>
                            <button className='boton-1' onClick={ () => setShowEliminarEmpleado(false) }>Cancelar</button>
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
                            <button className='boton-1' onClick={ () => setShowAlertModal(false) }>Aceptar</button>
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