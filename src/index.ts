import mock from 'require-mock';
mock('onoff', {
  Gpio: class Gpio {
    watch() {
      console.log('watching...');
    }
  }
});

// import * as onoff from 'onoff';
// // @ts-ignore
// onoff.Gpio = class {
//   watch(cb: (err: Error, state: number) => void) {
//     setInterval(() => {
//       cb(null, 1);
//     }, 1000)
//   }
// };
import { Button } from './components/Button';

const start = async () => {
  const b: Button = new Button({ pinId: 4 });
  await b.onClick();
  console.log('clicked!');
};


