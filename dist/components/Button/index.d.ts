export declare const BUTTON_STATE: {
    DOWN: number;
    UP: number;
    UNKNOWN: number;
};
export interface ButtonArgs {
    pinId: number;
}
export interface OnClickArgs {
    debounce?: number;
}
export declare class Button {
    private released;
    private waitingCancels;
    private readonly gpio;
    private readonly pinId;
    private readonly observable;
    constructor({ pinId }: ButtonArgs);
    private removeWaitingCancel;
    getPin(): number;
    onClick({ debounce }?: OnClickArgs): Promise<void>;
    releasePin(): void;
    private ensureNotReleased;
}
