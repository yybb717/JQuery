window.$=window.jQuery = function(selectorOrArray) {  //jQuery太长，用$代替
  let elements;
  if (typeof selectorOrArray === "string") {
    elements = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray;
  }

  //加入共有属性
  const api = Object.create(jQuery.prototype); //创建个名为api的对象，这个对象的__proto__为jQuery.prototype
                                               //相当于const api = {__proto__:jQuery.prototype}

  //加入自身属性
  /*小白写法
  api.elements = elements;
  api.oldApi = selectorOrArray.oldApi;
  */
  //大师写法：Object.assign()表示把后面这些属性一个一个的加入api对象
  Object.assign(api, {
    elements = elements,
    oldApi = selectorOrArray.oldApi
  })

  return api;
};

jQuery.fn=jQuery.prototype = {  //prototype太长，用fn代替
  //共有属性
  constructor: jQuery,
  oldApi: selectorOrArray.oldApi,
  jquery: true,

  find(selector) {
    let array = [];
    for (let i = 0; i < elements.length; i++) {
      array = array.concat(Array.from(elements[i].querySelectorAll(selector)));
    }
    array.oldApi = this; //先把目前的jQuery对象放到即将要成为新的elements的数组中去，成为一个oldApi属性
    return jQuery(array); //在返回 新建的 数组的jQuery对象
  },

  end() {
    return this.oldApi;
  }, //this为数组的JQuery对象了，他有个oldApi属性，属性值为selectorOrArray（也就是数组）的属性oldApi

  addClass(className) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add(className);
    }
    return this;
  },

  //each函数遍历elements中每个元素，并调用自写函数
  each(fn) {
    for (i = 0; i < elements.length; i++) {
      fn.call(null, elements[i], i);
    }
    return this;
  },

  //parent函数用于找elements中元素的爸爸
  parent() {
    const array = []; //新建空数组，把每个元素的爸爸推进来
    this.each(node => {
      if (array.indexOf(node.parentNode) === -1)
        //这个node的爸爸的数组里的下标为-1，表示根本不在里面，才进行push//我不知道为啥要这样做，你本来就是找每个元素的爸爸，为啥相同的爸爸还要归为一个？
        array.push(node.parentNode);
    }); //对当前的jQuery对象调用each函数，每个elements元素都执行函数：找到爸爸并且推到数组array中
    array.oldApi = this;
    return jQuery(array);
  },

  //print函数用于打印出elements
  print() {
    console.log(elements);
  },

  //children函数
  /*children() {     我的方法比老师的复杂点
    let array = [];   要用let声明数组，因为后面会变
    this.each(node => {
      array = array.concat(Array.from(node.children));
      console.log(array);
    });
    return jQuery(array);
  }*/
  children() {
    //老师的代码更少
    const array = [];
    this.each(node => {
      array.push(...node.children);
    });
    return jQuery(array);
  },

  //siblings函数找兄弟
  siblings() {
    let array = [];
    this.each(node => {
      array = array.concat(
        Array.from(node.parentNode.children).filter(n => n !== node)
      );
    });
    return jQuery(array);
  },

  //index函数获取排行老几
  index() {
    array = []; //容纳每个元素的排名
    this.each(node => {
      const list = node.parentNode.children;

      let m;
      for (m = 0; m < list.length; m++) {
        if (list[m] === node) {
          array.push(m);
          break;
        }
      }
    });

    return jQuery(array);
  },

  //next函数用于获取第一个弟弟
  next() {
    const array = [];
    this.each(node => {
      array.push(node.nextElementSibling);
    });
    return jQuery(array);
  },
  //prev函数用于获取前一个哥哥
  prev() {
    const array = [];
    this.each(node => {
      array.push(node.previousElementSibling);
    });
    return jQuery(array);
  }
};
