export enum ViewEvent  {
    RENDER = 'UPDATED',
    CLICK = 'CLICK',
    CARD_PLAYED = 'CARD_PLAYED'
}

export enum ModelEvent {
    UPDATED = 'UPDATED',
    MY_TURN = 'MY_TURN',
    NEW_TURN = 'NEW_TURN'
}

export type GameEvent = ViewEvent | ModelEvent