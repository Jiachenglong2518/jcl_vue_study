// import { Dep } from "./dep" //依赖数组
// import { arrayMethods } from "./array.js" //添加方法拦截后的数组方法
// 变化侦测，object的所有属性添加setter和getter方法，使其变成可观测的
const hasproto = "__proto__" in {}; // 是否支持__proto__ 属性
const arraykeys = Object.getOwnPropertyNames(arrayMethods); //被拦截的数组方法
class Observer  {
  constructor (val) {
    this.val = val
    this.deep = new Dep() //将数组 的deep保存在这里，可以让getter和拦截器都能访问到
    def(val, "__ob__", this)
    if (Array.isArray(val)) {
      // 用拦截后的数组原型方法覆盖监听数组的原型方法
      const augment = hasproto ? protoAugment : copyAugment
      augment(val, arrayMethods, arraykeys)
      this.observeArray(val)
    } else {
      this.walk(val);

    }
  }
  walk (obj) {
    const keys = obj.keys();
    for (let i = 0 ;i < keys.length ; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
}

/**
 * @Author: jiachenglong
 * @Date: 2021-10-20 18:27:02
 * @description: 拦截对象的get，set方法
 * @param { Object } data 要监测的对象
 * @param {*} key 对象的key值
 * @param {*} val 对象的值
 * @return {*}
 */
function defineReactive (data, key , val) {
  
  let childOb = observe(val) //获取对象属性值的实例，（如何该值不是可响应的则为该值闯将Obersever实例）
  let dep = new Dep() // data 依赖列表
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get () {
      dep.depend() // data的依赖添加
      if (childOb) { //复杂数据类型才会继续监测
        childOb.dep.depend() // val的依赖添加
      }
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
/**
 * @Author: jiachenglong
 * @Date: 2021-10-20 14:55:58
 * @description: 支持__proto__, 直接覆盖数组原型方法
 * @param { Array } target 当前监测的值
 * @param { Object } src 拦截后的数组原型方法
 * @param { Array } keys 拦截后的数组原型方法名组成的数组
 * @return {*}
 */
function protoAugment (target, src, keys) {
  target.__proto__ = src
}
/**
 * @Author: jiachenglong
 * @Date: 2021-10-20 14:55:58
 * @description: 不支持__proto__，直接重写方法
 * @param { Array } target 当前监测的值
 * @param { Object } src 拦截后的数组原型方法
 * @param { Array } keys 拦截后的数组原型方法名组成的数组
 * @return {*}
 */
function copyAugment (target, src, keys) {
  for(var i = 0; i< keys.length ; i++){
    var key = keys[i]
    def(target, key, src[key])
  }
}
/**
 * @Author: jiachenglong
 * @Date: 2021-10-21 15:20:30
 * @description: 
 * @param {*} val
 * @param {*} asRootData
 * @return {*}
 */
 function observe(val, asRootData) {
  if (!isObject(val)) { // 数据类型不是复杂数据类型，不需要继续检测，已经监测到了
    return
  }
  let ob
  // instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
  if(hasOwn(val, "__ob__") && val.__ob__ instanceof Observer) {
    ob = val.__ob__
  } else {
    ob = new Observer(val)
  }
  return ob
 }
 
 function isObject(obj) {
  return obj !== null && typeof obj === 'object'
 }

 /**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}
function observeArray (items) {
  for(let i = 0; i< items.length ; i++){
    observe(item[i])
  }
}


























var obj = {
  a: 1
};
defineReactive (obj, "a", 1);
obj.a;
obj.a = 2;