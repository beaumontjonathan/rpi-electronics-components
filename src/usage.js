import { Button, Lcd } from '.'

const run = async () => {
  const button = new Button({ pinId: 4 });
  const lcd = new Lcd({
    rs: 1,
    e: 2,
    data: [3, 4, 5, 6],
    cols: 16,
    rows: 2,
  });

  let n = 0;

  await lcd.at({ row: 0, col: 0 }).print('Press the button');

  try {
    while (true) {
      await Promise.all([
        lcd.at({ row: 1, col: 0 }).print(` n = ${n}`),
        button.onClick({ debounce: 100 }),
      ]);
    }
  } catch ({ message }) {
    await lcd.at({ row: 0, col: 0 }).print(' Error occurred ');
    await lcd.at({ row: 1, col: 9 }).print(message.substr(0, 12));

    button.releasePin();
    lcd.releasePins();
  }
};

run()
  .then(console.log)
  .catch(console.log);
