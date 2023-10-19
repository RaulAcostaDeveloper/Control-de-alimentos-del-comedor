import { useEffect, useState } from "react";
interface Posicion {
    columna: number;
    fila: number;
}
type Props = {
    className?: string;
    id?: string;
    children?: React.ReactNode;
}

// Variables globales del contenedor
let cuadricula: Posicion[] = [];
const posicionInicial = { columna: 1, fila: 1 }
export let actualPosicion: Posicion = posicionInicial;
export let isKeyListenerActive = true;

// Métodos globales
// Aleluya
const simulaRenderizado = () => {
    const event = new KeyboardEvent("keyup", { which:32,  key:' ', code:'Space', keyCode:32, charCode:32});
    document.dispatchEvent(event);
}
export const setIsKeyListenerActive = (toggle: boolean): void => {
    setTimeout(() => {
        isKeyListenerActive = toggle;
        simulaRenderizado();
    }, 10);
}
export const setActualPosicion = (nuevaPosicionActual: Posicion): void => {
    setTimeout(() => {
        actualPosicion = nuevaPosicionActual;
        simulaRenderizado();
    }, 10);
}
// CUADRICULA 
export const aniadePosicionACuadricula = (nuevaColumna: number, nuevaFila: number): void => {
    let nuevaCuadricula: Posicion[] = limpiarDuplicados(nuevaColumna, nuevaFila);
    const nuevaPosicion: Posicion = { columna: nuevaColumna, fila: nuevaFila };
    nuevaCuadricula.push(nuevaPosicion);
    cuadricula = nuevaCuadricula;
}
const limpiarDuplicados = (nuevaColumna: number, nuevaFila: number): Posicion[] => {
    let newArray: Posicion[] = cuadricula.map(el => el);
    let posicionesDuplicadas: number[] = [];
    newArray.forEach( (elemento, index) => {
        if (elemento.columna === nuevaColumna) {
            if (elemento.fila === nuevaFila) {
                posicionesDuplicadas.push(index);
            }
        }
    })
    posicionesDuplicadas.forEach((indice) => {
        newArray.splice(indice, 1);
    })
    return newArray;
}
export const limpiaPosicionDeCuadricula = (anteriorColumna: number, anteriorFila: number): void => {
    let newArray: Posicion[] = cuadricula.map(el => el);
    let posicionesDuplicadas: number[] = [];
    newArray.forEach( (elemento, index) => {
        if (elemento.columna === anteriorColumna) {
            if (elemento.fila === anteriorFila) {
                posicionesDuplicadas.push(index);
            }
        }
    })
    posicionesDuplicadas.forEach((indice) => {
        newArray.splice(indice, 1);
    })
    cuadricula = newArray;
}

export const openACandyModal = (ultimaColumna: number) => {
    setTimeout(() => {
        setActualPosicion({columna: ultimaColumna + 1, fila: 1});
        simulaRenderizado();
    }, 10);
}
export const reiniciaPosicionInicial = () => {
    actualPosicion = posicionInicial;
    simulaRenderizado();
}
export const getUltimaColumna = () => {
    return cuadricula[cuadricula.length - 1].columna;
}
// DIRECCIONES DE LA POSICIÓN
const getArriba = (): Posicion => {
    const columna: number = actualPosicion.columna -1;
    const fila: number = actualPosicion.fila;
    let resultado: Posicion = actualPosicion;
    if (columna > 0) {
        for (let index = 0; index < actualPosicion.fila; index++) {
            if (existePosicion(columna, fila - index)) {
                const posicionArriba: Posicion= {
                    columna,
                    fila: fila - index
                }
                resultado = posicionArriba;
                index = actualPosicion.fila;
            }
        }
    }
    return resultado;
}
const getAbajo = (): Posicion=> {
    const columna: number = actualPosicion.columna + 1;
    const fila: number = actualPosicion.fila;
    let resultado: Posicion= actualPosicion;
    if (columna > 0) {
        for (let index = 0; index < actualPosicion.fila; index++) {
            if (existePosicion(columna, fila - index)) {
                const posicionAbajo: Posicion= {
                    columna,
                    fila: fila - index
                }
                resultado = posicionAbajo;
                index = actualPosicion.fila;
            }
        }
    }
    return resultado;
}
const getDerecha = (): Posicion => {
    const columna: number = actualPosicion.columna;
    const fila: number = actualPosicion.fila + 1;
    if (existePosicion(columna,fila)) {
        const posicionDerecha: Posicion = {columna, fila};
        return posicionDerecha
    } else {
        return actualPosicion;
    }
}
const getIzquierda = (): Posicion => {
    const columna: number = actualPosicion.columna;
    const fila: number = actualPosicion.fila - 1;
    if (fila > 0) {
        if (existePosicion(columna,fila)) {
            const posicionIzquierda: Posicion = {columna, fila};
            return posicionIzquierda
        } else {
            return actualPosicion;
        }
    } else {
        return actualPosicion;
    }
}
const existePosicion = (columna: number, fila: number): boolean => {
    let resultado: boolean = false;
    cuadricula.forEach((posicion)=>{
        if (posicion.columna === columna) {
            if (posicion.fila === fila) {
                resultado = true;
            }
        }
    })
    return resultado;
}


// Aquí inicia el componente
export const CandyContainer = ({children, className, id}: Props): JSX.Element => {

    useEffect(() => {
        // Al renderizar
        // Evita el presionado de la tecla tab
        document.addEventListener("keydown", function(event) {             
            if (event.keyCode == 9) {
                event.preventDefault();
            }
          });
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            // En el desmontado
            document.removeEventListener('keyup', handleKeyUp);
        };
    },[]);
    
    const handleKeyUp = (event: any) => {
        if (isKeyListenerActive) {
            switchCases(event);
        }
    }

    const switchCases = (event: any) => {
        // Significa que se esta liberando la tecla
        // Esto debería ser true
        let key: string = event.code || String.fromCharCode(event.keyCode || event.which);
        switch (key.toLowerCase()) {
            case 'arrowdown':
                setActualPosicion(getAbajo());
                break;
            case 'keys':
                setActualPosicion(getAbajo());
                break;
            case 'arrowleft':
                setActualPosicion(getIzquierda());
                break;
            case 'keya':
                setActualPosicion(getIzquierda());
                break;
            case 'arrowup':
                setActualPosicion(getArriba());
                break;
            case 'keyw':
                setActualPosicion(getArriba());
                break;
            case 'arrowright':
                setActualPosicion(getDerecha());
                break;
            case 'keyd':
                setActualPosicion(getDerecha());
                break;
            default:
                break;
        }
    }

    // Permite agregarle una clase y un id
    return (
        <div className={className && className} id = {id && id}>
            {children && children}
        </div>
    )
}