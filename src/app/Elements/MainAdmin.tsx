type Props = {
    openLogin:(...args: any[]) => void;
}
import { useState } from 'react';
import '../Styles/MainAdmin.css';
import { EmpleadosList } from './EmpleadosList';
export const MainAdmin = ({ openLogin } :Props): JSX.Element => {
    const [ showList, setShowList ] = useState(false);
    const [ filtroNombre, setFiltroNombre ] = useState('');
    return (
        <div className="mainAdmin">
            <div className='tituloMain'>
                <h2>Pantalla del administrador</h2>
            </div>
            <button onClick={()=> openLogin() } className="boton-2 boton-flotante"> Logout </button>
            <div className="contenedorBotonMostrar">
                <button className="boton-1" onClick={ () => setShowList(true) }>Mostrar lista de empleados</button>
            </div>
            { showList && 
                <div className='listaEmpleados'>
                    <div className='filtro'>
                        <input
                            className='input-2'
                            type="text" 
                            placeholder='Filtro por nombre'
                            value={ filtroNombre }
                            onChange={ (event) => setFiltroNombre(event.target.value) }
                            />
                    </div>
                    <EmpleadosList filter = { filtroNombre }/>
                </div>
            }
        </div>
    )
}