import InternalLcd from 'lcd';

export interface LcdPins {
  rs: number,
  e: number,
  data: [number, number, number, number],
}

export interface LcdArgs extends LcdPins {
  cols: number,
  rows: number,
}

export interface ColRow {
  col: number,
  row: number,
}

export class Lcd {
  private readonly args: LcdArgs;
  private readonly internalLcd: InternalLcd;

  constructor(args: LcdArgs) {
    this.internalLcd = new InternalLcd(args);
  }

  public at({ col, row }: ColRow): this {
    this.internalLcd.setCursor(col, row);
    return this;
  }

  public print(str: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.internalLcd.print(str, (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  }

  public printAt(str: string, { col, row }: ColRow): Promise<void> {
    return this.at({ col, row }).print(str);
  }

  public clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.internalLcd.clear(err => {
        if (err) {
          return reject(err);
        }

        resolve();
      })
    });
  }

  public home(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.internalLcd.home(err => {
        if (err) {
          return reject(err);
        }

        resolve();
      })
    });
  }

  public showCursor(): void {
    this.internalLcd.cursor();
  }

  public hideCursor(): void {
    this.internalLcd.noCursor();
  }

  public showBlink(): void {
    this.internalLcd.blink();
  }

  public scrollDisplayLeft(): void {
    this.internalLcd.scrollDisplayLeft();
  }

  public hideBlink(): void {
    this.internalLcd.noBlink();
  }

  public scrollDisplayRight(): void {
    this.internalLcd.scrollDisplayRight();
  }

  public leftToRight(): void {
    this.internalLcd.leftToRight();
  }

  public rightToLeft(): void {
    this.internalLcd.rightToLeft();
  }

  public autoScrollOn(): void {
    this.internalLcd.autoscroll();
  }

  public autoScrollOff(): void {
    this.internalLcd.noAutoscroll();
  }

  public close(): void {
    this.internalLcd.close();
  }

  public getPins(): LcdPins {
    const { rs, e, data } = this.args;

    return { rs, e, data };
  }

  public getPinCodes(): [number, number, number, number, number, number] {
    const { rs, e, data: [d1, d2, d3, d4] } = this.args;

    return [rs, e, d1, d2, d3, d4];
  }

  public releasePins(): void {
    this.internalLcd.close();
  }
}
