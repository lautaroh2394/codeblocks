import { ViewEvent } from "../utils/events.constants";

export abstract class View {
    public events: { [key in ViewEvent]?: ((...args: any[]) => any) []} = {} 
    protected entity: any;
    protected element: HTMLElement;
    /**
     * Render method should create HTMLElement and set it as class attribute so the view can update it when necessary
     */
    abstract render(): HTMLElement;

    /**
     * Returns HTMLElement for the view
     */
    getElement(): HTMLElement {
        if (this.element) return this.element;
        this.element = this.render()
        return this.element
    }

    bind(event: ViewEvent, callback: (...args: any[]) => any){
        if (this.events[event] === undefined) this.events[event] = [];
        this.events[event]?.push(callback)
    }

    trigger(event: ViewEvent){
        this.events[event]?.forEach(callback => {
            callback(this.entity)
        })
    }
}