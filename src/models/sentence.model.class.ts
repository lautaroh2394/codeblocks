import { Variable } from "./variable.model.class";

export class Sentence {
    public assignedTo: Variable;

    constructor(public methodDescription: string){}
}