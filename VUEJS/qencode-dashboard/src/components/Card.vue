<template>
 <div class="card">
    <div>{{title}}</div>    
    <div :key="list.id"  v-for="list in lists">
        <div class="header"> 
            <div class="title">{{list.header.title}}</div>
            <div class="data">
                <div>{{list.header.data.value}}</div>
                <div :class="list.header.data.delta.positive ? 'positive' : 'negative'">{{list.header.data.delta.value}}</div>
            </div>
        </div>
        <div class="body">
            <div class="item" :key="item.id"  v-for="item in list.body">
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
   lists: Array
 }
}
</script>

<style scoped>
.card{
    background: #FFFFFF;
    box-shadow: 0px 1px 2px rgba(92, 95, 101, 0.2);
    border-radius: 8px;    
    max-width: 358px;
}

.positive {
    color: #00CD98;
}

.negative{
    color: red;
}
</style>