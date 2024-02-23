import { Player } from "../../models/player.model";
import { HTMLCreate, create } from "../../utils/create.function";
import { ViewEvent } from "../../utils/events.constants";
import { View } from "../view.abstract";

export abstract class Button extends View{
    protected abstract htmlCreate: Omit<HTMLCreate, 'events'>
    public create(){
        return create({
            ...this.htmlCreate,
            events: {
                "click": ()=>{
                    this.onClick()
                    this.trigger(ViewEvent.CLICK)
                }
            }
        })
    }

    /**
     * After the execution of 'onClick' the view will trigger ViewEvent.CLICK
     */
    protected onClick(){}

    protected abstract visitPlayer(player: Player)
}