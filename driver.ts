import EventEmitter from './src/EventEmitter';

let testCount = 0;
function eventHandler(arg: number = 0) {
    testCount = arg === 0 ? testCount + 1 : arg;
}

const ee = new EventEmitter();
ee.on('onSave', () => {});
ee.on('onSave', eventHandler);


ee.off('onSave',eventHandler);
console.log(ee.listenerCount('onSave'))