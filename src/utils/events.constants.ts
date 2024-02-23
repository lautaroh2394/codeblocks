export enum ViewEvent  {
    RENDER = 'UPDATED',
    CLICK = 'CLICK',
    CARD_PLAYED = 'CARD_PLAYED'
}

export enum ModelEvent {
    UPDATED = 'UPDATED',
    MY_TURN = 'MY_TURN',
    NEW_TURN = 'NEW_TURN',
    END_TURN = 'END_TURN'
}

export enum SentenceEvents {
    STARTED_EXECUTION = 'STARTED_EXECUTION',
    FINISHED_EXECUTION = 'FINISHED_EXECUTION',
}

export type GameEvent = ViewEvent | ModelEvent