/**
 * Módulo de funciones habituales con cadenas de texto
 * @module utilities/string-util
 */

/**
 * Determina si el parámetro dado es vacío
 * @param {*} value - Cualquier valor que se desea comprobar 
 * @returns True si el valor es null, undefined, cero, NaN o cadena vacía. False en otro caso
 */

export function isEmpty(value){
    return !value || !value.trim();
}

/**
 * Convierte la primera letra del texto en mayúscula
 * @param {string} word - Palabra a convertir
 * @returns La cadena de texto original con la primera letra en mayúscula
 */
export function capitalize(word){
    return word.charAt(0).toUpperCase();
}