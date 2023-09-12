import { Player } from "../models/player.model.class";
import { create } from "../utils/create.function";
import { ModelEvent, ViewEvent } from "../utils/events.constants";
import { CardView } from "./card.view.class";
import { View } from "./view.abstract.class";

export class ControlView extends View {
    static CLASSES = ["control-view", "blue"]
    static CARD_CLASSES = ["card"]
    static HTML_ELEMENT_ID = "control-view"

    private currentPlayer: Player;

    constructor(
        public players: Player[],
    ){
        super()
        players.forEach(player => {
            player.bind(ModelEvent.MY_TURN, player => this.currentPlayer = player)
            player.bind(ModelEvent.UPDATED, (player) => {
                if (this.isCurrentPlayer(player)){
                    this.render()
                }
            })
        })
    }
    
    public create(): HTMLElement {
        return create({
            tag: 'div',
            attributes: {
                id: ControlView.HTML_ELEMENT_ID
            },
            classes: ControlView.CLASSES,
            children: this.createPlayerCards()
        })
    }

    public updateCurrentPlayer(player: Player){
        this.currentPlayer = player
        this.render()
    }

    private createPlayerCards(){
        return this.currentPlayer?.cards.map(card => {
            const cardView = new CardView(card)
            cardView.bind(ViewEvent.CARD_PLAYED, (cardView: CardView)=>{
                console.log(`control view was notified of ${cardView.entity.name}`)
                this.trigger(ViewEvent.CARD_PLAYED, cardView)
                this.render()
            })
            return cardView.render()
        })
    }

    private isCurrentPlayer(player: Player){
        return player.name == this.currentPlayer.name
    }
}