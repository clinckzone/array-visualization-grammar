/**
 * Binds a key with each array item in the diagram
 * so that it can be uniquely identified by d3.
 * @param {any} value 
 * @returns {{key:string; value: any}}
 */
export function bindToKey(value) {
    return {
        value: value,
        key: uuidv4()
    };
}
