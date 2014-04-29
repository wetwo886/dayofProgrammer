
/// <summary>定义场景基类</summary>
define(['defineClass'], function (defineClass) {
  /// <summary>场景基类,基于canvas</summary>
  var SceneBase = defineClass({
    //场景编号
    id: '',
    //场景画布
    sceneCanvas: null,
    //画布上下文
    ctx: null,
    //构造函数
    ctor: function (id) {
      if (id) {
        this.id = id;
        this.sceneCanvas = document.getElementById(this.id);
        if (!this.sceneCanvas) {
          throw new Error('无法获取指定编号' + this.id + '的场景canvas');
        }
        this.ctx = this.sceneCanvas.getContext('2d');
      } else {
        throw new Error('场景编号不存在，无法获取场景对象')
      }
    }
  });

  return SceneBase;
})

