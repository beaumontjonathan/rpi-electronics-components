import { Gpio } from 'onoff';
import { Observable } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';

export const BUTTON_STATE = {
  DOWN: 1,
  UP: 0,
  UNKNOWN: -1,
};

type ButtonState = 1 | 0 | -1;

export interface ButtonArgs {
  pinId: number;
}

export interface OnClickArgs {
  debounce?: number;
}

export class Button {
  private readonly gpio: Gpio;
  private readonly pinId: number;
  private readonly observable: Observable<boolean>;

  constructor({ pinId }: ButtonArgs) {
    this.pinId = pinId;
    this.gpio = new Gpio(pinId, 'in', 'both');
    this.observable = new Observable<boolean>((subscriber) => {
      this.gpio.watch((err: Error, state: ButtonState) => {
        if (err) {
          return subscriber.error(err);
        }

        subscriber.next(state === BUTTON_STATE.DOWN);
      });
    });
  }

  public getPin(): number {
    return this.pinId;
  }

  public async onClick({ debounce }: OnClickArgs = {}): Promise<void> {
    if (debounce) {
      await this.observable.pipe(debounceTime(debounce), first()).toPromise();
    } else {
      await this.observable.pipe(first()).toPromise();
    }
  }
}
