function defineReactive (data, key , val) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get () {
      return val
    },
    set (newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
    }

  })
}