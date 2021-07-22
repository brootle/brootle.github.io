<template>
 <div class="card">

    <div class="card-title">{{title}}</div>
      
    <div class="item" :key="item.id"  v-for="item in items">
        <div :class="item.list ? 'header header--list' : 'header'"> 
            <div class="title">{{item.header.title}}</div>
            <div class="data">
                <div>{{item.header.data.value}}</div>
                <div :class="item.header.data.delta.positive ? 'positive' : 'negative'">{{item.header.data.delta.value}}</div>
            </div>
        </div>
        <div class="list">
            <div class="item" :key="item.id"  v-for="item in item.list">
                <div class="text">
                    {{item.text}}
                </div>  
                <div class="data">
                    <div>{{item.data.value}}</div>
                    <div :class="item.data.delta.positive ? 'positive' : 'negative'">{{item.data.delta.value}}</div>
                </div>                
            </div>
        </div>
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
    padding: 16px 13px;
    color: #7E848F;

    font-family: Arial;
    font-weight: 500;
    font-size: 14px;    

    box-sizing: border-box;
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
}

.header > .title{
    flex: 1;
}

.positive {
    color: #00CD98;
}

.negative{
    color: red;
}
</style>