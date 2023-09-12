export enum CardType {
    SENTENCE,
    OPERACION,
    VARIABLE
}

export type Method = (...args : any[]) => any;
export type OptionalRecord<K extends string, V> = {
    [key in K]?: V
}