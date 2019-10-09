<template>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper" :class="{'highlight':totalCount>0}">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop" >
            <!--外层动画-->
            <div class="ball" v-show="ball.show">
              <!--内层动画-->
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "shopCart",
        data(){
        return {
          balls:[
            {
            show:false
            },
            {
              show:false
            },
            {
              show:false
            },
            {
              show:false
            },
            {
              show:false
            },
          ],
          dropBall:[]
        }

      },
      props:{
          selectFoods:{
            type:Array,
            //array或object需要是函数
            default(){
              return []
            }
          },
          deliveryPrice:{
            type:Number,
            default:0
          },
          minPrice:{
            type:Number,
            default:0
          },
        },
      computed:{
         totalPrice(){
            let total=0;
            this.selectFoods.forEach((food) => {
              total += food.price * food.count
            })
            return total
          },
        totalCount(){
          let count = 0;
          this.selectFoods.forEach((food) => {
            count += food.count
          })
          return count
        },
        payDesc(){
           //console.log(this.totalPrice)
            if(this.totalPrice === 0){
              return `￥${this.minPrice}元起送`
            }
            else if(this.totalPrice < this.minPrice){
              let diff=this.minPrice - this.totalPrice
              return `还差￥${diff}起送`
            }
            else {
              return `去结算`
            }
        },
        payClass(){
          if(this.totalPrice < this.minPrice){
            return `not-enough`
          }
         else{
            return `enough`
          }
        }
      },
      methods:{
        drop(el) {// 点击加号看是否输出成功
          for(let i=0;i<this.balls.length;i++){
            let ball=this.balls[i]
            if(!ball.show){
              ball.show = true
              ball.el=el;
              this.dropBall.push(ball)
              return;
            }
          }
        },

        beforeDrop(el){
          let count=this.balls.length;
          while(count--){
            let ball=this.balls[count]
            if(ball.show){
              let rect=ball.el.getBoundingClientRect() //获取小球的相对于视口的位移(小球高度)
              let x=rect.left-32
              let y=-(window.innerHeight-rect.top-22) //负数,因为是从左上角往下的的方向
              el.style.display=''
              el.style.webkitTransform=`translate3d(0,${y}px,0)`;
              el.style.transform = `translate3d(0,${y}px,0)`;
              let inner=el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform =`translate3d(${x}px,0,0)`;
              inner.style.transform =`translate3d(${x}px,0,0)`;
            }
          }
        },
        dropping: function(el, done) {
          /* eslint-disadle no-unused-vars */
          let rf  = el.offsetHeight;
          this.$nextTick(() => { //让动画效果异步执行,提高性能
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            //处理内层动画
            let inner = el.getElementsByClassName('inner-hook')[0];
            //console.log(inner);
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
            el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器
          });
        },
        afterDrop: function(el) { //这个方法的执行是因为这是一个vue的监听事件
          let ball = this.dropBall.shift(); //完成一次动画就删除一个dropBalls的小球
          if (ball) {
           // console.log(el);
            ball.show = false;
            el.style.display = 'none';  //隐藏小球
          }
        }
        // enter(el){
        //
        // }




      }
    }
</script>

<style lang="stylus">
  .shopcart
    position:fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    background #fff
    .content
     display flex
     background #141d27
     font-size:0
     color:rgba(255,255,255,0.4)
     .content-left
       flex:1
       .logo-wrapper
         display inline-block
         vertical-align top
         position relative
         top -10px
         margin:0 12px
         padding:6px
         width 56px
         height:56px
         box-sizing border-box
         border-radius 50%
         background #141d27
         .logo
           width: 100%
           height 100%
           border-radius 50%
           background #2b343c
           text-align center
           &.highlight
             background rgb(0,160,220)
           .icon-shopping_cart
             line-height 44px
             font-size 24px
             color:#80858a
             &.highlight
               color: #fff
         .num
           position:absolute
           top:0
           right:0
           width:24px
           height:16px
           line-height 16px
           text-align center
           border-radius 16px
           font-size:9px
           font-weight 700
           color:#fff
           background rgb(240,20,20)
           box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
       .price
         display inline-block
         vertical-align top
         margin-top 12px
         line-height 24px
         box-sizing border-box
         padding-right 12px
         border-right 1px solid rgba(255,255,255,0.1)
         font-size:16px
         font-weight 700
         &.highlight
          color:#fff
       .desc
         display inline-block
         vertical-align top
         line-height 24px
         margin 12px 0 0 12px
         font-size:16px
     .content-right
       flex 0 0 105px
       width:105px
       .pay
        height:48px
        line-height 48px
        text-align center
        font-size: 12px
        font-weight 700
        &.not-enough
          background #2b33b
        &.enough 
          background #00b43c
          color: #fff

    .ball-container
     .ball
      position fixed
      left 32px
      bottom 22px
      z-index 200
      transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width 16px
        height 16px
        border-radius 50%
        background rgb(0,160,220)
        transition all 0.4s linear
</style>
