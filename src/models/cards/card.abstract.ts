import { CardType } from "../../utils/types.constants";
import { Bindable } from "../bindable.abstract";
import { Player } from "../player.model";
import { Script } from "../script.model";

export abstract class Card extends Bindable {

    constructor(
        public type: CardType,
        public name: string,
        public description: string,
    ){
        super()
    }

    public beInvokedBy(player: Player, script: Script){
        player.removeCard(this);
        const sentence = this.createSentence(script.getNextId())
        script.appendSentence(sentence)
    }

    protected abstract createSentence(id: number)
}