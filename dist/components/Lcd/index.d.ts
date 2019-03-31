export interface LcdPins {
    rs: number;
    e: number;
    data: [number, number, number, number];
}
export interface LcdArgs extends LcdPins {
    cols: number;
    rows: number;
}
export interface ColRow {
    col: number;
    row: number;
}
export declare class Lcd {
    private readonly args;
    private readonly internalLcd;
    constructor(args: LcdArgs);
    at({ col, row }: ColRow): this;
    print(str: string): Promise<void>;
    printAt(str: string, { col, row }: ColRow): Promise<void>;
    clear(): Promise<void>;
    home(): Promise<void>;
    showCursor(): void;
    hideCursor(): void;
    showBlink(): void;
    scrollDisplayLeft(): void;
    hideBlink(): void;
    scrollDisplayRight(): void;
    leftToRight(): void;
    rightToLeft(): void;
    autoScrollOn(): void;
    autoScrollOff(): void;
    close(): void;
    getPins(): LcdPins;
    getPinCodes(): [number, number, number, number, number, number];
    releasePins(): void;
}
