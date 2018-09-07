import EventEmitter from '../src/EventEmitter';

let testCount = 0;
function eventHandler(arg: number = 0) {
    testCount = arg === 0 ? testCount + 1 : arg;
}
describe('Event Emitter', () => {
    beforeEach(() => {
        testCount  = 0;
    });

    it("should create instance of Event Emitter", () => {
        const ee = new EventEmitter();
        expect(ee instanceof EventEmitter).toBe(true);
    });

    it("should add event and event handlers correctly", () => {
        const ee = new EventEmitter();
        ee.on('onSave', () => {});
        expect(ee.listenerCount('onSave')).toBe(1);

        ee.on('onSave', eventHandler);
        expect(ee.listenerCount('onSave')).toBe(2);
    });

    it("should emit all event handlers for an event",() => {
        const ee = new EventEmitter();
        ee.on('onSave', () => {testCount = testCount + 1;});
        ee.on('onSave', eventHandler);
        expect(testCount).toBe(0);

        ee.emit('onSave');
        expect(testCount).toBe(2);
    });

    it("should invoke event handler with arguments",() => {
        const ee = new EventEmitter();
        ee.on('onSave', eventHandler);

        ee.emit('onSave',10);
        expect(testCount).toBe(10);
    });

    it("should remove event handlers",() => {
        const ee = new EventEmitter();
        ee.on('onSave', () => {testCount = testCount + 1;});
        ee.on('onSave', eventHandler);
        

        ee.off('onSave',eventHandler);
        expect(ee.listenerCount('onSave')).toBe(1);
    });

    it("should not emit removed event handler",() => {
        const ee = new EventEmitter();
        ee.on('onSave', eventHandler);

        ee.off('onSave',eventHandler);
        ee.emit('onSave', 10);
        expect(testCount).toBe(0);
    });
});