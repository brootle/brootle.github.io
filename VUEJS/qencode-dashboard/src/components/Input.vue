<template>
 <div class="input">
    <div class="input__label">
        <label>{{label}}</label>
    </div>
    <input class="input__field" type="text" value="">                           
 </div>
</template>
 
<script>
export default {
 props: {
   label: String,
   value: String
 }
}
</script>