import { Bindable } from "../models/bindable.abstract";
import { ViewEvent } from "../utils/events.constants";
import { Method } from "../utils/types.constants";

export abstract class View extends Bindable<ViewEvent> {
    public events: { [key in ViewEvent]?: Method[]} = {} 
    //protected entity: any;
    protected element: HTMLElement;
    /**
     * Creates the HTMLElement, triggers ViewEvent.RENDER event, and returns the element
     */
    render(..._args: any[]): HTMLElement {
        this.element = this.create();
        this.trigger(ViewEvent.RENDER)
        console.log(`${this.constructor.name} rendered`)
        return this.element
    }

    /**
     * Returns HTMLElement for the view. Calls render() if it doesnt exist
     */
    getElement(): HTMLElement {
        if (this.element) return this.element;
        return this.render()
    }

    /**
     * This method creates the HTMLElement
     */
    abstract create();
}