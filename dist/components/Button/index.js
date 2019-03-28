"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = exports.BUTTON_STATE = void 0;

var _onoff = require("onoff");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const BUTTON_STATE = {
  DOWN: 1,
  UP: 0,
  UNKNOWN: -1
};
exports.BUTTON_STATE = BUTTON_STATE;

class Button {
  constructor({
    pinId
  }) {
    _defineProperty(this, "released", false);

    _defineProperty(this, "waitingCancels", []);

    _defineProperty(this, "gpio", void 0);

    _defineProperty(this, "pinId", void 0);

    _defineProperty(this, "observable", void 0);

    this.pinId = pinId;
    this.gpio = new _onoff.Gpio(pinId, 'in', 'both');
    this.observable = new _rxjs.Observable(subscriber => {
      const waitingCancel = () => subscriber.error(new Error('Button released'));

      this.waitingCancels.push(waitingCancel);
      this.gpio.watch((err, state) => {
        if (err) {
          this.removeWaitingCancel(waitingCancel);
          return subscriber.error(err);
        }

        subscriber.next(state === BUTTON_STATE.DOWN);
      });
    });
  } // TODO: Remove waiting cancels for all resolved subscriptions


  removeWaitingCancel(fn) {
    if (this.waitingCancels.includes(fn)) {
      const index = this.waitingCancels.indexOf(fn);
      this.waitingCancels.splice(index, 1);
    }
  }

  getPin() {
    return this.pinId;
  }

  async onClick({
    debounce
  } = {}) {
    this.ensureNotReleased();

    if (debounce) {
      await this.observable.pipe((0, _operators.debounceTime)(debounce), (0, _operators.first)()).toPromise();
    } else {
      await this.observable.pipe((0, _operators.first)()).toPromise();
    }
  }

  releasePin() {
    this.ensureNotReleased();
    this.gpio.unexport();
    this.released = true;
    this.waitingCancels.forEach(f => f());
  }

  ensureNotReleased(message = 'Button pin already released') {
    if (this.released) {
      throw new Error(message);
    }
  }

}

exports.Button = Button;
//# sourceMappingURL=index.js.map