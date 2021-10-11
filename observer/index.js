// import { Dep } from "./dep"
// let { Dep } = require('./dep');
function defineReactive (data, key , val) {
  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get () {
      dep.depend()
      return val
    },
    set (newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      dep.notify()
    }

  })
}
var obj = {
  a: 1
};
defineReactive (obj, "a", 1);
obj.a;
obj.a = 2;