import { HTMLCreate, create } from "../../utils/create.function";
import { ViewEvent } from "../../utils/events.constants";
import { MenuView } from "../menu.view";
import { View } from "../view.abstract";

export abstract class PlayerMenuButton extends View {
    protected abstract htmlCreate(): Omit<HTMLCreate, 'events'>;

    public constructor(private menuView: MenuView){
        super();
        this.bind(ViewEvent.CLICK, ()=>{
            this.onClick(this.menuView.player)
        })
    }

    public create(){
        return create({
            attributes: {
                id: this.id
            },
            ...this.htmlCreate(),
            events: {
                "click": ()=>{
                    this.trigger(ViewEvent.CLICK)
                }
            }
        })
    }

    /**
     * When clicked, the view will trigger ViewEvent.CLICK and that will dispatch the onClick() method
     */
    protected onClick(_){}

    public trigger(...args){
        if (this.menuView.isEnabled){
            super.trigger.apply(this, args as [ViewEvent, any])
        }
    }
}