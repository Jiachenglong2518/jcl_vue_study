// 数据的依赖类，谁使用了数据，谁就是依赖
export default class Watcher {
  constructor (vm, expOrFn,cb) {
    this.vm = vm
    this.cb = cb;
    this.getter = this.parsePath(expOrFn)
    this.val = this.get()
  }
  get () {
    window.target = this;
    const vm = this.vm;
    let val = this.getter.call(vm. vm)
    window.target = undefined; //??  为什么设为undefined??
    return val
  }
  update (val) {
    let oldval = this.val;
    if (oldval == val) {
      return
    }
    this.val = this.get();
    this.cb().call(this.vm, this.val. oldval)
  }
}
const bailRE = /[^\w.$]/; //查找不是以点结尾的单词字符
/**
 * Parse simple path.
 * 把一个形如'data.a.b.c'的字符串路径所表示的值，从真实的data对象中取出来
 * 例如：
 * data = {a:{b:{c:2}}}
 * parsePath('a.b.c')(data)  // 2
 */
const bailRE = /[^w\.$]/
export function parsePath (path) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split('.');
  return function (obj) {
    for(var i = 0 ; i < segments.length ; i++){
      if (!obj){return}
      obj = obj[segments[i]];
    }
    return obj;

  }
}