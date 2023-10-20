import { useEffect, useState } from "react";
import { 
    aniadePosicionACuadricula, 
    actualPosicion, 
    limpiaPosicionDeCuadricula, 
    isKeyListenerActive, 
    setIsKeyListenerActive, 
    setActualPosicion } from './CandyContainer';

type Props = {
    className?: string;
    id?: string;
    children?: React.ReactNode;
    onEnter?:(...args: any[]) => void;
    onSpace?:(...args: any[]) => void;
    idInput?: string;
    posicion: [number, number];
}

// Algunas variables deben ser globales
let isThisCandyActive: boolean = false;
let isThisCandyOnInput: boolean = false;
let inputActual: string = '';

export const Candy = ({ className, id, children, onEnter, onSpace, idInput, posicion }: Props): JSX.Element => {
    // Estado cuando este Candy es selected permite añadir una clase al componente
    const [ isActive, setIsActive ] = useState<boolean>(false);

    useEffect(()=>{
        // Manda la posición de este candy a la cuadrícula
        aniadePosicionACuadricula(posicion[0], posicion[1]);
        // Primer render si posición actual es esta posición entonces isActive
        changeIsActive();

        // Al renderizar
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            // En el desmontado
            document.removeEventListener('keyup', handleKeyUp);
            limpiaPosicionDeCuadricula(posicion[0], posicion[1]);
        };
    },[]);

    const handleKeyUp = (event: any): void => {
        listenAction(event);
    }

    const listenAction = (event: any): void => {
        if (isKeyListenerActive) {
            changeIsActive();
            if (isThisCandyActive) {
                let key: string = event.code || String.fromCharCode(event.keyCode || event.which);
                switch (key.toLowerCase()) {
                    case 'enter': // ENTER EVENT
                        if (onEnter) {
                            onEnter();
                        }
                        if (idInput) { 
                            entrarAlInput();
                            inputActual = idInput;
                        }
                        break;
                    case 'space': // SPACE EVENT
                        if (onSpace) {
                            onSpace();
                        }
                    break;
                    default:
                        break;
                }
            }
        } else if (isThisCandyOnInput) {
            // Salir del input
            let key: string = event.code || String.fromCharCode(event.keyCode || event.which);
            if (key.toLowerCase() === 'enter') {
                salirDelInput();
            }
        }
    }

    // INPUT
    const entrarAlInput = ()=> {
        if (idInput) {
            const inputElement: HTMLInputElement | null = document.getElementById(idInput) as HTMLInputElement;
            if (inputElement instanceof HTMLInputElement) {
                setIsKeyListenerActive(false);
                isThisCandyOnInput = true;
                inputElement.select();
                setIsActive(false);
            } else {
                console.log('ERROR CANDY 1 ', idInput, ' no se encuentra como input');
                
            }
        }
    };
    const salirDelInput = () => {
        if (idInput) {
            const inputElement: HTMLInputElement | null = document.getElementById(inputActual) as HTMLInputElement;
            if (inputElement instanceof HTMLInputElement) {
                inputElement.blur();
                inputActual = '';
                isThisCandyOnInput = false;
                setIsKeyListenerActive(true);
            } else {
                console.log('ERROR CANDY 2 ', idInput, ' no se encuentra como input');
            }
        }
    }

    // Pregunta si la posición actuál corresponde a la posición de este Candy
    const changeIsActive = () => {
        if (actualPosicion.columna  === posicion[0] && actualPosicion.fila === posicion[1]) {
            setIsActive(true);
            isThisCandyActive = true;
        } else {
            setIsActive(false);
            isThisCandyActive = false;
        }
    }

    const handleOnClick = () => {
        inputActual = '';
        isThisCandyOnInput = false;
        setIsKeyListenerActive(true);
        setActualPosicion({ columna: posicion[0], fila: posicion[1] });
        if (idInput) { 
            entrarAlInput();
            inputActual = idInput;
        }
    }

    return (
        <div 
            className = { `Candy ${ isActive && 'candyActive' } ${ className && className }` } 
            id = { id && id } 
            onClick={ () => handleOnClick() }>
            { children && children }
        </div>
    )
}