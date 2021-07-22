<template>
 <div class="card">

    <div class="card-title">{{title}}</div>
       
    <div class="item" :key="item.id"  v-for="item in items">
        <div :class="item.list ? 'header header--list' : 'header'"> 
            <div class="text">{{item.header.title}}</div>
            <div class="data">
                <div class="value">{{item.header.data.value}}</div>
                <div class="delta" :class="item.header.data.delta.positive ? 'positive' : 'negative'">{{item.header.data.delta.value}}</div>
            </div>
        </div>
        <ul class="list">
            <li class="header" :key="item.id"  v-for="item in item.list">
                <div class="text">
                    {{item.text}}
                </div>  
                <div class="data">
                    <div class="value">{{item.data.value}}</div>
                    <div class="delta" :class="item.data.delta.positive ? 'positive' : 'negative'">{{item.data.delta.value}}</div>
                </div>                
            </li>
        </ul>
    </div> 


 </div>
</template>
 
<script>
export default {
 props: {
   title: String,
   items: Array,
 }
}
</script>

<style scoped>
.card{
    background: #FFFFFF;
    box-shadow: 0px 1px 2px rgba(92, 95, 101, 0.2);
    border-radius: 8px;    
    max-width: 358px;
    width: 100%;
    padding: 16px 13px;
    color: #7E848F;

    font-family: Arial;
    font-weight: 500;
    font-size: 14px;    

    box-sizing: border-box;
}

.card > .item:last-of-type{
    margin-bottom: 0;
}

.card-title{
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 27px;    
    color: #4F4F4F;
    padding: 0 5px;
}

.header{
    display: flex;
    padding: 5px;
    box-sizing: border-box;
}

.header.header--list{
    background-color: #F1F2F4;
    border-radius: 4px;
    margin-bottom: 10px;
}

.header > .text{
    flex: 1;
    padding-right: 10px;
}

.list > .header > .text{
    position: relative;
}

.list > .header > .text:after {
    content: '';
    position: absolute;
    left: -13px;
    top: 5px;
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #C4C4C4;
}

.data{
    text-align: right;
}

.value{
    color: #171717;
    font-weight: 600;
}

.delta{
    font-size: 12px;
}

.positive {
    color: #00CD98;
}

.negative{
    color: red;
}

.item{
    margin: 10px 0;
}

.list{
    padding-left: 20px;
    margin: 0;
}
</style>