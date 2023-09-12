import { CardType } from "../utils/types.constants";
import { Bindable } from "./bindable.abstract.class";
import { Player } from "./player.model.class";
import { Script } from "./script.model.class";
import { Sentence } from "./sentence.model.class";

export class Card extends Bindable {

    constructor(
        public type: CardType,
        public name: string,
        public description: string,
    ){
        super()
    }

    public invoke(player: Player, script: Script){
        player.removeCard(this);
        const sentence = this.createSentence()
        script.appendSentence(sentence)
    }

    private createSentence(){
        return new Sentence('carta dinámica')
    }
}