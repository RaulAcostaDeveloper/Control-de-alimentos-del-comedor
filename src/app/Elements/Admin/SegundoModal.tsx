import { Candy } from "../Candys/Candy"
type Props  = {
    textSegundoModal: string;
    handleCloseSegundoModal: (...args: any[]) => void;
}
export const SegundoModal = ({ textSegundoModal, handleCloseSegundoModal}: Props ) => {
    return (
        <div className="containerModal">
        <div className="innerModal">
            <div className='titulo'> 
                <h3>{textSegundoModal}</h3>
            </div>
            <div className='boton'>
                <Candy
                    posicion={ [11, 1] }
                    onEnter={ handleCloseSegundoModal }>
                    <button className='boton-1' onClick={ () => handleCloseSegundoModal() }>Aceptar</button>
                </Candy>
            </div>
        </div>
    </div>
    )
}