import { Sentence } from "./sentence.abstract";

export class ExampleSentence extends Sentence {

    constructor(id: number){
        super(
            id,
            "Sentencia de ejemplo",
            "Esta carta no hace nada, es solo un ejemplo para usar en el desarrollo"
        )
    }
    protected executeLogic() {
        console.log(`Sentence "${this.name}" (id: ${this.id}) executed`)
    }
}