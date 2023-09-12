import { Bindable } from "../models/bindable.abstract.class";
import { ModelEvent } from "../utils/events.constants";
import { View } from "./view.abstract.class";

export abstract class EntityView extends View {
    constructor(public entity: Bindable){
        super()
        entity.bind(ModelEvent.UPDATED, () => this.render())
    }
}