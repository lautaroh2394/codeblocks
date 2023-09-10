import { Sentence } from "./sentence.model.class";

export class Script {
    public sentences: Sentence[]

    constructor(sentences : Sentence[] = []){
        this.sentences = sentences
    }
}