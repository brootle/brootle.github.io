<template>
 <div class="input">
    <div class="input__label">
        <label>{{label}}</label>
    </div>
    <div class="custom-select">
        <select class="select">
            <option :key="option.value"  v-for="option in options" :value='option.value'>{{option.name}}</option>
        </select>
    </div>                            
 </div>
</template>
 
<script>
export default {
 props: {
   label: String,
   options: Array
 }
}
</script>