// import { Button } from './components/Button';
import Button from '.';
import Lcd from './Lcd';

const button = new Button({ pin: 7, debounce: 20 });
const lcd = new Lcd({ pins: { data: [3, 4, 5, 6], rs: 1, e: 2 } });

const run = async () => {
  await lcd.start();
  await lcd.printAt({ x: 0, y: 0 }, 'hello world');
  await button.onClick();
  await button.onDoubleClick();
};
