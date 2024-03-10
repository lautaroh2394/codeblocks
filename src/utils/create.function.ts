import { View } from "../views/view.abstract";

type AttributesDefinition = Record<string, string>
type HTMLElementEventMapKeys = keyof HTMLElementEventMap
type EventsDefinition = {[key in HTMLElementEventMapKeys]?: (...args: any[]) => any}

export interface HTMLCreate {
    tag: string, 
    classes?: string[], 
    children?: (HTMLCreate | HTMLElement | View )[], 
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
      let appendable
      if (child instanceof HTMLElement) appendable = child
      else if (child instanceof View) appendable = child.render()
      else appendable = create(child)
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