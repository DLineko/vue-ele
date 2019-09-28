<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
  const ERR_OK=0;
  export default {
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return {
        goods:[]
      }
    },
    created(){
      this.classMap=['decrease','discount','guarantee','invoice','special']
      this.$http.get('/api/goods').then((response)=>{
        response=response.body
        if(response.errno==ERR_OK){
          this.goods=response.data;
        }
      })
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/maxmin.styl"
  .goods
    display :flex
    position: absolute;
    top:174px
    bottom:46px
    width:100%
    overflow hidden
    .menu-wrapper
     flex 0 0 80px
     width:80px
     background:#f3f5f7
     .menu-item
       display :table
       height:54px
       width:56px
       line-height:14px
       .icon
         display: inline-block
         vertical-align:top
         width: 12px
         height:12px
         margin-right :2px
         background-size:12px 12px
         background-repeat: no-repeat
         &.decrease
           bg-image('decrease_3')
         &.discount
           bg-image('discount_3')
         &.guarantee
           bg-image('guarantee_3')
         &.invoice
           bg-image('invoice_3')
         &.special
           bg-image('special_3')
       .text
         display :table-cell
         font-size:12px
    .foods-wrapper
     flex 1



</style>
