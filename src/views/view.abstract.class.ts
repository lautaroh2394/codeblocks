import { Bindable } from "../models/bindable.abstract.class";
import { ViewEvent } from "../utils/events.constants";

export abstract class View extends Bindable {
    public events: { [key in ViewEvent]?: ((...args: any[]) => any) []} = {} 
    protected entity: any;
    protected element: HTMLElement;
    /**
     * Creates the HTMLElement and returns it
     */
    render(): HTMLElement {
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