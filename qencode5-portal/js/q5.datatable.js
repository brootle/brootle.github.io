$(document).ready(function(){

    // Disable search and ordering by default
    $.extend( $.fn.dataTable.defaults, {
        searching: false
    } );

    var videoSettingsTable = $('#video_settings_table').DataTable( {  
    
        // see https://datatables.net/reference/option/language.aria.paginate.next
        language: {
            paginate: {
                previous: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
                next:     '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
            },
            aria: {
                paginate: {
                    previous: 'Previous',
                    next:     'Next'
                }
            },
            info: `<span class="q5-text-gray"> <span class="q5-table-visible-records">_START_ - _END_</span> of _TOTAL_</span>`
        },

        "iDisplayLength": 5,
        "pagingType": "simple",     // see https://datatables.net/examples/basic_init/alt_pagination.html

        rowReorder: {
            selector: 'td:last-child'
        },

        "aoColumns": [
            null,
            { "bSortable": false, "width": "8%" },
            { "width": "12%" },
            { "width": "10%" },
            { "width": "8%" },
            { "width": "10%" },
            { "width": "35%" },
            { "bSortable": false, "width": "10%" },
            { "bSortable": false, "width": "7%" }
        ],

        "dom": 'rt<"q5-table-navigation"ip><"clear">'
        //"dom": '<"top"ip>rt<"bottom"ip><"clear">'

    });


    // event listener on row reorder
    videoSettingsTable.on( 'row-reorder', function ( e, diff, edit ) {

        // info on row that was moved and triggered event
        console.log(edit.triggerRow.data());
        
        // info on rows that changed their positions
        console.log(diff);


    });


    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////

    var thumbnailTable = $('#thumbnail_table').DataTable( {  
    
        // see https://datatables.net/reference/option/language.aria.paginate.next
        language: {
            paginate: {
                previous: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
                next:     '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
            },
            aria: {
                paginate: {
                    previous: 'Previous',
                    next:     'Next'
                }
            },
            info: `<span class="q5-text-gray"> <span class="q5-table-visible-records">_START_ - _END_</span> of _TOTAL_</span>`
        },

        "iDisplayLength": 5,
        "pagingType": "simple",     // see https://datatables.net/examples/basic_init/alt_pagination.html

        rowReorder: {
            selector: 'td:last-child'
        },

        "aoColumns": [
            null,
            { "bSortable": false, "width": "8%" },
            { "width": "14%" },
            { "width": "10%" },
            { "width": "51%" },
            { "bSortable": false, "width": "10%" },
            { "bSortable": false,  "width": "7%" }
        ],

        "dom": 'rt<"q5-table-navigation"ip><"clear">'
        //"dom": '<"top"ip>rt<"bottom"ip><"clear">'

    });


    // event listener on row reorder
    thumbnailTable.on( 'row-reorder', function ( e, diff, edit ) {

        // info on row that was moved and triggered event
        console.log(edit.triggerRow.data());
        
        // info on rows that changed their positions
        console.log(diff);


    });    


    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////    

    var thumbnailTableSize = $('#thumbnail_table_size').DataTable( {  
    
        // see https://datatables.net/reference/option/language.aria.paginate.next
        language: {
            paginate: {
                previous: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
                next:     '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
            },
            aria: {
                paginate: {
                    previous: 'Previous',
                    next:     'Next'
                }
            },
            info: `<span class="q5-text-gray"> <span class="q5-table-visible-records">_START_ - _END_</span> of _TOTAL_</span>`
        },

        "iDisplayLength": 5,
        "pagingType": "simple",     // see https://datatables.net/examples/basic_init/alt_pagination.html

        rowReorder: {
            selector: 'td:last-child'
        },

        "aoColumns": [
            null,
            { "width": "15%" },
            { "width": "20%" },
            { "width": "48%" },
            { "bSortable": false, "width": "10%" },
            { "bSortable": false,  "width": "7%" }
        ],

        "dom": 'rt<"q5-table-navigation"ip><"clear">'
        //"dom": '<"top"ip>rt<"bottom"ip><"clear">'

    });    

    // event listener on row reorder
    thumbnailTableSize.on( 'row-reorder', function ( e, diff, edit ) {

        // info on row that was moved and triggered event
        console.log(edit.triggerRow.data());
        
        // info on rows that changed their positions
        console.log(diff);


    });        


    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////    

    var transferMethodTable = $('#transfer_method_table').DataTable( {  
    
        // see https://datatables.net/reference/option/language.aria.paginate.next
        language: {
            paginate: {
                previous: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
                next:     '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
            },
            aria: {
                paginate: {
                    previous: 'Previous',
                    next:     'Next'
                }
            },
            info: `<span class="q5-text-gray"> <span class="q5-table-visible-records">_START_ - _END_</span> of _TOTAL_</span>`
        },

        "iDisplayLength": 5,
        "pagingType": "simple",     // see https://datatables.net/examples/basic_init/alt_pagination.html

        rowReorder: false,

        "aoColumns": [
            null,
            { "width": "45%" },
            { "width": "45%" },
            { "bSortable": false, "width": "10%" }
        ],

        "dom": 'rt<"q5-table-navigation"ip><"clear">'
    });   

    // find all "q5-tabcontent-with-tables" and remove this style
    // basically we hide inactive content after tables were initiated
    // we need to initate tables when they are displayed in order to set widths of columns
    const tabContentWithTables = document.querySelectorAll('.q5-tabcontent-with-tables');
    tabContentWithTables.forEach(tabContent => {
        tabContent.classList.remove("q5-tabcontent-with-tables");
    });          

});