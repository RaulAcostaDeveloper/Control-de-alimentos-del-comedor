type Props = {
    openLogin:(...args: any[]) => void;
}
import { useEffect, useState } from 'react';
import { CandyContainer, setActualPosicion } from '../Candys/CandyContainer';
import { Candy } from '../Candys/Candy';
import { AccionesAdmin } from './AccionesAdmin';
export const MainAdmin = ({ openLogin } :Props): JSX.Element => {
    const [ showList, setShowList ] = useState(false);
    useEffect(()=>{
        setActualPosicion({ columna: 2, fila: 1 });
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
                <AccionesAdmin/>
            </div>
        </CandyContainer>
    )
}