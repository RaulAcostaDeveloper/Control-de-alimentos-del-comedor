import { useEffect, useState } from 'react';
import '../Styles/EmpleadosList.css';
import { ModalAniadirEmpleado } from './ModalAniadirEmpleado';

type Empleado = {
    Id_Empleado: string;
    nombre: string;
    tieneAcceso: boolean;
    proximoHorario: number,
}
type Props = {
    filter?: string;
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
    const empleadosFiltrados = empleados.filter((empleado) => {
        return empleado.Id_Empleado.toLowerCase().includes(filtro.toLowerCase());
      });
      return empleadosFiltrados;
}
export const EmpleadosList = ({ filter } :Props): JSX.Element => {
    const [ empleadosLista, setEmpleadosLista ] = useState(empleados);
    const [ showAniadirEmpleado, setShowAniadirEmpleado ] = useState(false);

    useEffect(()=> {
        if (filter) {
            const arr = filtraPorNombre(filter);
            setEmpleadosLista(arr)
        } else {
            setEmpleadosLista(empleados);
        }
    },[filter]);



    const handleAniadirEmpleado = (newEmpleado: Empleado) => {
        const objFiltrado = filtraPorId(newEmpleado.Id_Empleado);
        if (objFiltrado.length ===  0) {
            aniadirEmpleado(newEmpleado);
            const obj = empleados.map((el)=>el);
            setEmpleadosLista(obj);
        } else {
            console.log('Ya existe el empleado');
        }
    }

    return (
        <>
            <div className='cuadroDeAcciones'>
                <p>Acciones</p>
                <button className="boton-1" onClick={ () => setShowAniadirEmpleado(true) }>Añadir empleado</button>
                {/* <button className="boton-1" onClick={ () => setShowAniadirEmpleado(true) }>Eliminar empleado</button> */}

            </div>
            { showAniadirEmpleado && 
                <ModalAniadirEmpleado
                    setShowAniadirEmpleado = { setShowAniadirEmpleado }
                    handleAniadirEmpleado = { handleAniadirEmpleado }/>
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