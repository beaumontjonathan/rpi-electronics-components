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
  private released: boolean = false;
  private waitingCancels: Array<() => void> = [];
  private readonly gpio: Gpio;
  private readonly pinId: number;
  private readonly observable: Observable<boolean>;

  constructor({ pinId }: ButtonArgs) {
    this.pinId = pinId;
    this.gpio = new Gpio(pinId, 'in', 'both');
    this.observable = new Observable<boolean>((subscriber) => {
      const waitingCancel = () => subscriber.error(new Error('Button released'));
      this.waitingCancels.push(waitingCancel);

      this.gpio.watch((err: Error, state: ButtonState) => {
        if (err) {
          this.removeWaitingCancel(waitingCancel);
          return subscriber.error(err);
        }

        subscriber.next(state === BUTTON_STATE.DOWN);
      });
    });
  }

  // TODO: Remove waiting cancels for all resolved subscriptions
  private removeWaitingCancel(fn: () => void) {
    if (this.waitingCancels.includes(fn)) {
      const index = this.waitingCancels.indexOf(fn);
      this.waitingCancels.splice(index, 1);
    }
  }

  public getPin(): number {
    return this.pinId;
  }

  public async onClick({ debounce }: OnClickArgs = {}): Promise<void> {
    this.ensureNotReleased();

    if (debounce) {
      await this.observable.pipe(debounceTime(debounce), first()).toPromise();
    } else {
      await this.observable.pipe(first()).toPromise();
    }
  }

  public releasePin(): void {
    this.ensureNotReleased();

    this.gpio.unexport();
    this.released = true;
    this.waitingCancels.forEach(f => f());
  }

  private ensureNotReleased(message: string = 'Button pin already released'): void {
    if (this.released) {
      console.log('here', this.released);
      throw new Error(message);
    }
  }
}
