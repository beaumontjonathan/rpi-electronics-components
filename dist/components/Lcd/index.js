"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lcd = void 0;

var _lcd = _interopRequireDefault(require("lcd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Lcd {
  constructor(args) {
    _defineProperty(this, "args", void 0);

    _defineProperty(this, "internalLcd", void 0);

    this.internalLcd = new _lcd.default(args);
  }

  at({
    col,
    row
  }) {
    this.internalLcd.setCursor(col, row);
    return this;
  }

  print(str) {
    return new Promise((resolve, reject) => {
      this.internalLcd.print(str, err => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  }

  printAt(str, {
    col,
    row
  }) {
    return this.at({
      col,
      row
    }).print(str);
  }

  clear() {
    return new Promise((resolve, reject) => {
      this.internalLcd.clear(err => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  }

  home() {
    return new Promise((resolve, reject) => {
      this.internalLcd.home(err => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  }

  showCursor() {
    this.internalLcd.cursor();
  }

  hideCursor() {
    this.internalLcd.noCursor();
  }

  showBlink() {
    this.internalLcd.blink();
  }

  scrollDisplayLeft() {
    this.internalLcd.scrollDisplayLeft();
  }

  hideBlink() {
    this.internalLcd.noBlink();
  }

  scrollDisplayRight() {
    this.internalLcd.scrollDisplayRight();
  }

  leftToRight() {
    this.internalLcd.leftToRight();
  }

  rightToLeft() {
    this.internalLcd.rightToLeft();
  }

  autoScrollOn() {
    this.internalLcd.autoscroll();
  }

  autoScrollOff() {
    this.internalLcd.noAutoscroll();
  }

  close() {
    this.internalLcd.close();
  }

  getPins() {
    const {
      rs,
      e,
      data
    } = this.args;
    return {
      rs,
      e,
      data
    };
  }

  getPinCodes() {
    const {
      rs,
      e,
      data: [d1, d2, d3, d4]
    } = this.args;
    return [rs, e, d1, d2, d3, d4];
  }

  releasePins() {
    this.internalLcd.close();
  }

}

exports.Lcd = Lcd;
//# sourceMappingURL=index.js.map