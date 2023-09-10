export abstract class View {
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
}