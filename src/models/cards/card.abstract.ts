import { CardType } from "../../utils/types.constants";
import { Bindable } from "../bindable.abstract";
import { Player } from "../player.model";
import { Script } from "../script.model";

export abstract class Card extends Bindable {

    static idGenerator = (function *nextId(){
        let i = 0
        while (true){
            yield i++
        }
    })()

    static get nextId(){
        return this.idGenerator.next().value
    }

    public id: number

    constructor(
        public type: CardType,
        public name: string,
        public description: string,
    ){
        super()
        this.id = Card.nextId
    }

    public beInvokedBy(player: Player, script: Script){
        player.removeCardById(this.id);
        const sentence = this.createSentence(script.getNextId())
        script.appendSentence(sentence)
    }

    protected abstract createSentence(id: number)
}