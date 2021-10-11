 class Dep {
  constructor () {
    this.subs = [];
  }

  addSub (sub) {
    this.subs.push(sub);
  }

  removeSub (sub) {
    remove(this.subs, sub) 
  }

  // 收集依赖
  depend () {
    console.log("in depend");
    if (window.target) {
      this.addSub(window.target)
    }
  }

  // 通知依赖更新
  notify () {
    console.log("in notify");
    const subs = this.subs.slice();
    for (var i = 0, l = subs.length ; i < l ; i++) {
      subs[i].updata()
    }
  }
}

function remove (arr, item) {
  if (arr.length) {
    let index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
// module.exports = {
//   Dep
// }