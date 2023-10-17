type Props = {
    openLogin:(...args: any[]) => void;
}
import { useState } from 'react';
import '../Styles/MainAdmin.css';
import { EmpleadosList } from './EmpleadosList';
export const MainAdmin = ({ openLogin } :Props): JSX.Element => {
    const [ showList, setShowList ] = useState(false);
    return (
        <div className="mainAdmin">
            <div className='tituloMain'>
                <h2>Pantalla del administrador</h2>
            </div>
            <button onClick={()=> openLogin() } className="boton-2 boton-flotante"> Logout </button>
            <div className='cuadroDeAcciones'>
                <p>Acciones</p>
            </div>
            { showList ? 
                <div className="contenedorBotonMostrar">
                    <button className="boton-1" onClick={ () => setShowList(false) }>Ocultar lista de empleados</button>
                </div>
                :
                <div className="contenedorBotonMostrar">
                    <button className="boton-1" onClick={ () => setShowList(true) }>Mostrar lista de empleados</button>
                </div>
            }
            { showList && 
                <div className='listaEmpleados'>
                    <EmpleadosList/>
                </div>
            }
        </div>
    )
}