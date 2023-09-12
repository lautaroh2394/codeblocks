type AttributesDefinition = Record<string, string>
type HTMLElementEventMapKeys = keyof HTMLElementEventMap
type EventsDefinition = {[key in HTMLElementEventMapKeys]?: (...args: any[]) => any}
//Record<HTMLElementEventMapKeys, (...args: any[]) => void | any>
interface HTMLCreate {
    tag: string, 
    classes?: string[], 
    children?: (HTMLCreate | HTMLElement)[], 
    attributes?: AttributesDefinition, 
    textContent?: string, 
    events?: EventsDefinition,
}

export const create = ({
    tag, 
    classes, 
    children, 
    attributes, 
    textContent, 
    events,
  }: HTMLCreate) => {
    const el = document.createElement(tag);
    if (classes) classes.forEach((clase) => el.classList.add(clase));
    if (children) children.forEach((child) => {
      const appendable = child instanceof HTMLElement ? child : create(child)
      el.append(appendable)
    });
    if (attributes) {
      Object.keys(attributes).forEach((attrKey) => el.setAttribute(attrKey, attributes[attrKey]));
    }
    if (textContent) (el.textContent = textContent);
    if (events) {
      Object.keys(events).forEach((event) => {
        const eventToConfigure = events[event as HTMLElementEventMapKeys]
        el.addEventListener(event as HTMLElementEventMapKeys, eventToConfigure as any);
      });
    }
    return el;
  };