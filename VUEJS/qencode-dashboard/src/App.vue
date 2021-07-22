<template>
 <div class="container">
  <div class="filter">
    <Select :label="selectPeriod.label" :options="selectPeriod.options" />
    <Select :label="selectFormat.label" :options="selectFormat.options" />
    <Select :label="selectCodec.label" :options="selectCodec.options" />
    <Select :label="selectStatus.label" :options="selectStatus.options" />
    <Input :label="usernameInput.label" :options="usernameInput.value" />
    <Input :label="sessionInput.label" :options="sessionInput.value" />
    <button>Download report</button>
  </div>
  <div class="cards">
    <div>
      <Card :title="cardSpeed.title" :items="cardSpeed.items" />
    </div>
  </div>
 </div>
</template>
 
<script>
import Select from "./components/Select.vue";
import Input from "./components/Input.vue";
import Card from "./components/Card.vue";
 
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
  },

  cardSpeed:{
    title:"Speed",   
    items:[
      {
        id: 1,
        header: {
          title: "Transcode time per Job",
          data: {
            value:"00:15:01",
            delta: {
              value: "-33.33%",
              positive: true
            }
          }
        },
       
      },

      {
        id: 2,
        header: {
          title: "Transcode time per Job",
          data: {
            value:"00:15:01",
            delta: {
              value: "-33.33%",
              positive: true
            }
          }
        },
        list:[          
          {
            id: 1,
            text: "HLS",
            data: {
              value:"999",
              delta: {
                value: "-5.04%",
                positive: true
              }
            }
          },
          {
            id: 2,
            text: "H.265",
            data: {
              value:"999",
              delta: {
                value: "-0.41%",
                positive: true
              }
            }
          },
          {
            id: 3,
            text: "Median Realtime Duration to Processing Duration ratio",
            data: {
              value:"999",
              delta: {
                value: "-3.55%",
                positive: false
              }
            }
          },                                  
        ]      
      },

      {
        id: 3,
        header: {
          title: "Jobs longer than 3x Realtime",
          data: {
            value:"00:15:01",
            delta: {
              value: "55.55%",
              positive: false
            }
          }
        },
        list:[          
          {
            id: 1,
            text: "HLS",
            data: {
              value:"999",
              delta: {
                value: "-5.04%",
                positive: true
              }
            }
          },
          {
            id: 2,
            text: "H.265",
            data: {
              value:"999",
              delta: {
                value: "-0.41%",
                positive: true
              }
            }
          },                      
          
        ]        
      }      
    ]
  }
}

export default {
 components: {
   Select,
   Input,
   Card
 },
 data() {
   return data
 }
}
</script>

<style>
  body{
    background-color: #f3f4f7;
  }
</style>