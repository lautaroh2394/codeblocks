import { Bindable } from "../models/bindable.abstract";
import { ViewEvent } from "../utils/events.constants";
import { Method } from "../utils/types.constants";

export abstract class View extends Bindable<ViewEvent> {
    public events: { [key in ViewEvent]?: Method[]} = {} 
    protected element: HTMLElement;
    protected id: string
    protected enabled: boolean = true;

    constructor(){
        super()
        this.id = crypto.randomUUID()
    }

    public toggleEnabled(enabled: boolean = !this.enabled){
        this.enabled = enabled;
    }

    public get isEnabled(){ return this.enabled }

    /**
     * Creates the HTMLElement, replaces itself into the DOM tree (if it was present), then triggers ViewEvent.RENDER event, and returns the element
     */
    render(..._args: any[]): HTMLElement {
        let newElement = this.create();

        if (this.element?.parentElement){
            this.element.parentElement.insertBefore(newElement, this.element)
            this.element.parentElement.removeChild(this.element)
        }
        this.element = newElement
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