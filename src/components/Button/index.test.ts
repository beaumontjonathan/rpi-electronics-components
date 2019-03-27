import { Button } from '.';

const mockWatch = jest.fn();

jest.mock('onoff', () => ({
  Gpio: class Gpio {
    watch = mockWatch;
  },
}));

let b: Button;

const getLatestCall = () => mockWatch.mock.calls[0];

describe('Button', () => {
  beforeEach(() => {
    b = new Button({ pinId: 4 });
    mockWatch.mockReset();
  });

  describe('#getPin', () => {
    it('should match the provided pin', () => {
      const pinId = 6;
      const button = new Button({ pinId });
      expect(button.getPin()).toBe(pinId);
    });
  });

  describe('#onClick', () => {
    it('should watch', async () => {
      expect(typeof b.onClick().then).toBe('function');
      expect(mockWatch).toHaveBeenCalled();
    });

    it('should resolve onClick promise when watch called', async () => {
      const promise = b.onClick();
      expect(mockWatch).toHaveBeenCalled();
      const [watch] = getLatestCall();
      watch(null, 1);
      await expect(promise).resolves.toBe(undefined);
    });

    it('should debounce', async () => {
      const debounce = 100;
      const p1 = b.onClick({ debounce });
      expect(mockWatch).toHaveBeenCalled();
      const [watch] = getLatestCall();
      const start = Date.now();
      watch(null, 1);
      await p1;
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(debounce);
    });
  });
});
