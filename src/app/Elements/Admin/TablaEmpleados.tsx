import { empleados } from "@/app/Constants/CrudEmpleados";
import { useEffect, useState } from "react";
type Props = {
    filtro?: string;
}
export const TablaEmpleados = ({ filtro }: Props): JSX.Element => {
    const [ empleadosLista, setEmpleadosLista ] = useState(empleados);
    useEffect(()=>{
        if (filtro) {
            const arr = filtraPorNombre(filtro);
            setEmpleadosLista(arr)
        } else {
            setEmpleadosLista(empleados);
        }
    },[filtro]);

    const filtraPorNombre = (filtro: string) => {
        const empleadosFiltrados = empleados.filter((empleado) => {
            return empleado.nombre.toLowerCase().includes(filtro.toLowerCase());
          });
          return empleadosFiltrados;
    }
    return (
        <div>
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
        </div>
    )
}