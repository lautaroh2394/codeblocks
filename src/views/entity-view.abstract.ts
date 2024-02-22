import { Bindable } from "../models/bindable.abstract";
import { ModelEvent } from "../utils/events.constants";
import { View } from "./view.abstract";

export abstract class EntityView<T extends Bindable> extends View {
    constructor(public entity: T){
        super()
        entity.bind(ModelEvent.UPDATED, () => this.render())
    }
}