<template>
 <div>
  <div class="filter">
    <Select :label="selectPeriod.label" :options="selectPeriod.options" />
    <Select :label="selectFormat.label" :options="selectFormat.options" />
    <Select :label="selectCodec.label" :options="selectCodec.options" />
    <Select :label="selectStatus.label" :options="selectStatus.options" />
  </div>
  <div class="cards">
    cards
  </div>
 </div>
</template>
 
<script>
import Select from "./components/Select.vue";
 
const data = {
  selectPeriod: {
    label: 'Choose period:',
    options:[
      { value: 1, name: 'Option 1'},
      { value: 2, name: 'Option 2'},
      { value: 3, name: 'Option 3'}
    ]
  },
  selectFormat: {
    label: 'Format',
    options:[
      { value: 1, name: 'Option 1'},
      { value: 2, name: 'Option 2'},
      { value: 3, name: 'Option 3'}
    ]    
  },
  selectCodec: {
    label: 'Codec',
    options:[
      { value: 1, name: 'Option 1'},
      { value: 2, name: 'Option 2'},
      { value: 3, name: 'Option 3'}
    ]    
  },
  selectStatus: {
    label: 'Status',
    options:[
      { value: 1, name: 'Option 1'},
      { value: 2, name: 'Option 2'},
      { value: 3, name: 'Option 3'}
    ]    
  },
  usernameInput:{
    label: 'User',
    value: ''
  },
  sessionInput:{
    label: 'Sessions',
    value: ''    
  }
}

export default {
 components: {
   Select
 },
 data() {
   return data
 }
}
</script>