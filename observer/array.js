// 获取数组原型方法
const arrayProto = Array.prototype;
// 备份数组原型方法
const arrayMethods = Object.create(arrayProto);
// 将备份数组的改变数组方法重写，加入拦截逻辑，并调用原型方法
["push", "pop", "shift", "unshift", "splice", "reverse", "sort"].forEach(function (method) {
  var original = arrayProto[method]
  Object.defineProperty(arrayMethods, method, {
    value: function mutator (...args) {
      return original.apply(this, args)
    },
    enumerable: false,  //为true时该属性会出现在该对象的枚举属性
    writable: true,     // value可以被改变
    configurable: true, //改属性的描述符可以被改变，；也可以被删除
  })
});
// const arraykeys = Object.getOwnPropertyNames(arrayMethods)
// console.log(arraykeys);