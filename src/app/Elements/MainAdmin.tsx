type Props = {
    openLogin:(...args: any[]) => void;
}
import { useEffect, useState } from 'react';
import '../Styles/MainAdmin.css';
import { EmpleadosList } from './EmpleadosList';
import { CandyContainer, setActualPosicion } from './Candys/CandyContainer';
import { Candy } from './Candys/Candy';
export const MainAdmin = ({ openLogin } :Props): JSX.Element => {
    const [ showList, setShowList ] = useState(false);

    const handleShowList = () => {
        setShowList(true);
        // const botonOcultarLista = document.getElementById('botonOcultarLista');
        // const botonMostrarLista = document.getElementById('botonMostrarLista');
        // if (botonMostrarLista && botonOcultarLista) {
        //     botonMostrarLista.style.visibility = "hidden";
        //     botonOcultarLista.style.visibility = "visible";
        //     setActualPosicion({ columna: 3, fila: 1 });
        // }
    }
    const handleHideList = () => {
        setShowList(false);
        // const botonOcultarLista = document.getElementById('botonOcultarLista');
        // const botonMostrarLista = document.getElementById('botonMostrarLista');
        // if (botonMostrarLista && botonOcultarLista) {
        //     botonMostrarLista.style.visibility = "visible";
        //     botonOcultarLista.style.visibility = "hidden";
        //     setActualPosicion({ columna: 2, fila: 1 });
        // }
    }
    useEffect(()=>{
        // const botonOcultarLista = document.getElementById('botonOcultarLista');
        // const botonMostrarLista = document.getElementById('botonMostrarLista');
        // if (botonMostrarLista && botonOcultarLista) {
        //     botonOcultarLista.style.visibility = "hidden";
        //     setActualPosicion({ columna: 2, fila: 1 });
        // }
    },[]);

    return (
        <CandyContainer>
            <div className="mainAdmin">
                <div className='tituloMain'>
                    <h2>Pantalla del administrador</h2>
                </div>
                <div className='boton-flotante'>
                    <Candy 
                        posicion={[1,1]}
                        onEnter={ openLogin }>
                        <button onClick={()=> openLogin() } className="boton-2">Log out</button>
                    </Candy>
                </div>
                <div className='cuadroDeAcciones'>
                    <p>Acciones</p>
                </div>
                    <div className="contenedorBotonMostrar" id='botonMostrarLista'>
                        <Candy 
                            posicion={ [2,1] }
                            onEnter={ handleShowList }>
                            <button className="boton-1" onClick={ () => handleShowList() }>Mostrar lista de empleados</button>
                        </Candy>
                    </div>
                    <div className="contenedorBotonMostrar" id='botonOcultarLista'>
                        <Candy 
                            posicion={ [3,1] }
                            onEnter={ handleHideList }>
                            <button className="boton-1" onClick={ () => handleHideList() }>Ocultar lista de empleados</button>
                        </Candy>
                    </div>

                { showList && 
                    <div className='listaEmpleados'>
                        <EmpleadosList/>
                    </div>
                }
            </div>
        </CandyContainer>
    )
}