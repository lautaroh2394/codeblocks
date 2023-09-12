import { GameEvent } from "../utils/events.constants";
import { Method, OptionalRecord } from "../utils/types.constants";

export abstract class Bindable {
    protected binds: OptionalRecord<GameEvent, Method[]> = {}

    public bind(event: GameEvent, callback: (...args: any[])=> any){
        if (this.binds[event] === undefined) this.binds[event] = [];
        this.binds[event]?.push(callback)
    }

    public trigger(event, optionalParameter?){
        this.binds[event]?.forEach( callback => {
            const parameter = optionalParameter ? optionalParameter : this
            callback(parameter)
        })
    }
}