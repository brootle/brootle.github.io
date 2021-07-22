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
  <div class="grid">    
    <Card class="grid-item" :title="cardSpeed.title" :items="cardSpeed.items" /> 
    <Card class="grid-item" :title="cardUserGrowth.title" :items="cardUserGrowth.items" /> 
    <Card class="grid-item" :title="cardReliability.title" :items="cardReliability.items" /> 
    <Card class="grid-item" :title="cardFinancials.title" :items="cardFinancials.items" /> 
    <Card class="grid-item" :title="cardSpeed.title" :items="cardSpeed.items" />   
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
  },

  cardUserGrowth:{
    title:"User growth",   
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
       
      },

      {
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
        id: 10,
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
        id: 11,
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
        id: 12,
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
    
    ]
  },
  
  cardReliability:{
    title:"Reliability",   
    items:[
      {
        id: 1,
        header: {
          title: "Total Errors",
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
          title: "Errors by type",
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
            text: "Error 1",
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
            text: "Error 2",
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
            text: "Error 3",
            data: {
              value:"999",
              delta: {
                value: "-3.55%",
                positive: false
              }
            }
          },  
          {
            id: 4,
            text: "Error 4",
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
          title: "Error Percentage",
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
            text: "Error 1",
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
            text: "Error 2",
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
            text: "Error 3",
            data: {
              value:"999",
              delta: {
                value: "-3.55%",
                positive: false
              }
            }
          },  
          {
            id: 4,
            text: "Error 4",
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
        id: 4,
        header: {
          title: "Total Exceptions",
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
            text: "Error 1",
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
            text: "Error 2",
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
            text: "Error 3",
            data: {
              value:"999",
              delta: {
                value: "-3.55%",
                positive: false
              }
            }
          },  
          {
            id: 4,
            text: "Error 4",
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
        id: 5,
        header: {
          title: "Exceptions Percentage",
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
            text: "Error 1",
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
            text: "Error 2",
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
            text: "Error 3",
            data: {
              value:"999",
              delta: {
                value: "-3.55%",
                positive: false
              }
            }
          },  
          {
            id: 4,
            text: "Error 4",
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
        id: 6,
        header: {
          title: "Number of jobs by state (excluding errors and completed)",
          data: {
            value:"3522552",
            delta: {
              value: "-33.33%",
              positive: true
            }
          }
        },
       
      },

    ]
  },  

  cardFinancials:{
    title:"Financials",   
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
       
      },

      {
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
        id: 10,
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
        id: 11,
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
        id: 12,
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
        id: 13,
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
        id: 14,
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
        id: 15,
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
        id: 16,
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
        id: 17,
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
        id: 18,
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
        id: 19,
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
    
    ]
  },

  cardPerformance:{
    title:"Performance",   
    items:[
      {
        id: 1,
        header: {
          title: "Total Errors",
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
          title: "Total Errors",
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
        id: 3,
        header: {
          title: "Total Errors",
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
        id: 4,
        header: {
          title: "Total Errors",
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
        id: 5,
        header: {
          title: "Total Errors",
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
        id: 6,
        header: {
          title: "Errors by type",
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
            text: "Error 1",
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
            text: "Error 2",
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
            text: "Error 3",
            data: {
              value:"999",
              delta: {
                value: "-3.55%",
                positive: false
              }
            }
          },  
          {
            id: 4,
            text: "Error 4",
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
        id: 7,
        header: {
          title: "Total Errors",
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
        id: 8,
        header: {
          title: "Total Errors",
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
        id: 9,
        header: {
          title: "Total Errors",
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
        id: 10,
        header: {
          title: "Total Errors",
          data: {
            value:"00:15:01",
            delta: {
              value: "-33.33%",
              positive: true
            }
          }
        },       
      },         

    ]
  },    
  
}

import Masonry from "masonry-layout"

export default {
 components: {
   Select,
   Input,
   Card
 },
 data() {
   return data
 },
 mounted() {
  var grid = document.querySelector('.grid');
  new Masonry( grid, {
    itemSelector: '.grid-item',
    columnWidth: 358,
    gutter: 10
  });
 }  
}
</script>

<style>
  body{
    background-color: #f3f4f7;
  }

  .grid-item{
    margin-bottom: 10px;
  }
</style>