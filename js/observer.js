function defineReactive(data, key, val) {
  observe(val);  // 递归遍历所有子属性
  var dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      if(Dep.target) { // 是否需要添加订阅者
        dep.addSub(Dep.target); //添加订阅者
      }
      return val;
    },
    set: function(newVal) {
      if(val === newVal) {
        return
      }
      val = newVal;
      console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
      dep.notify(); // 如果数据变化，通知所有订阅者
    }
  })
};

function observe(data) {
  if(!data || typeof data !== 'object') {
    return
  };
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
};

// 订阅器
function Dep() {
  this.subs = [];
};

Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    this.subs.forEach(sub => {
      sub.update();
    })
  }
}

Dep.target = null;

// var library = {
//   book1: {
//       name: ''
//   },
//   book2: ''
// };
// observe(library);
// library.book1.name = 'vue权威指南'; // 属性name已经被监听了，现在值为：“vue权威指南”
// library.book2 = '没有此书籍';  // 属性book2已经被监听了，现在值为：“没有此书籍”
