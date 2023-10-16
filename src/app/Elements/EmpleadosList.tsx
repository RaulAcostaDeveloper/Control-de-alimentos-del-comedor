import { useEffect, useState } from 'react';
import '../Styles/EmpleadosList.css';
const obtenerFechaActual = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const año = fechaActual.getFullYear();
    return `${año}-${mes < 10 ? "0" : ""}${mes}-${dia < 10 ? "0" : ""}${dia}`;
}
  
const obtenerFechaSiguiente = () => {
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + 1);
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const año = fechaActual.getFullYear();
    return `${año}-${mes < 10 ? "0" : ""}${mes}-${dia < 10 ? "0" : ""}${dia}`;
}
export const empleados = [
    {
      Id_Empleado: "4256",
      nombre: "Juan Pérez",
      tieneAcceso: true,
      proximoHorario: 7,
      proximaFecha: obtenerFechaActual(),
    },
    {
      Id_Empleado: "1234",
      nombre: "María López",
      tieneAcceso: true,
      proximoHorario: 14,
      proximaFecha: obtenerFechaSiguiente(),
    },
    {
      Id_Empleado: "9876",
      nombre: "Pedro García",
      tieneAcceso: true,
      proximoHorario: 14,
      proximaFecha: obtenerFechaSiguiente(),
    },
    {
      Id_Empleado: "5678",
      nombre: "Ana Martínez",
      tieneAcceso: true,
      proximoHorario: 7,
      proximaFecha: obtenerFechaActual(),
    },
    {
      Id_Empleado: "2345",
      nombre: "Luis Rodríguez",
      tieneAcceso: true,
      proximoHorario: 7,
      proximaFecha: obtenerFechaSiguiente(),
    },
    {
      Id_Empleado: "7890",
      nombre: "Laura Gómez",
      tieneAcceso: false,
      proximoHorario: 14,
      proximaFecha: obtenerFechaSiguiente(),
    },
    {
      Id_Empleado: "4567",
      nombre: "Carlos Sánchez",
      tieneAcceso: true,
      proximoHorario: 7,
      proximaFecha: obtenerFechaActual(),
    },
    {
      Id_Empleado: "3456",
      nombre: "Marcela Ramírez",
      tieneAcceso: true,
      proximoHorario: 7,
      proximaFecha: obtenerFechaSiguiente(),
    },
    {
      Id_Empleado: "6789",
      nombre: "Diego Pérez",
      tieneAcceso: true,
      proximoHorario: 7,
      proximaFecha: obtenerFechaActual(),
    },
    {
      Id_Empleado: "8901",
      nombre: "Sofía López",
      tieneAcceso: false,
      proximoHorario: 14,
      proximaFecha: obtenerFechaSiguiente(),
    },
    // Agrega más empleados aquí...
];
type Empleado = {
    Id_Empleado: string;
    nombre: string;
    tieneAcceso: boolean;
    proximoHorario: number,
    proximaFecha: Date,
}
type Props = {
    filter?: string;
}
export const EmpleadosList = ({ filter } :Props): JSX.Element => {
    const [ empleadosLista, setEmpleadosLista ] = useState([{}]);
    useEffect(()=>{
        setEmpleadosLista(empleados);
    },[]);
    useEffect(()=> {
        if (filter) {
            const arr = filtraPorNombre(filter);
            console.log('arr ', arr);
            console.log('empleadosLista ', empleadosLista);
            setEmpleadosLista(arr)
        } else {
            setEmpleadosLista(empleados);
        }
    },[filter]);
    const filtraPorNombre = (filtro: string) => {
        const empleadosFiltrados = empleados.filter((empleado) => {
            return empleado.nombre.toLowerCase().includes(filtro.toLowerCase());
          });
        
          return empleadosFiltrados;
    }
    return (
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
    )
}