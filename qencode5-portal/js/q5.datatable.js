$(document).ready(function(){

    // Disable search and ordering by default
    $.extend( $.fn.dataTable.defaults, {
        searching: false
    } );

    var table = $('#video_settings_table').DataTable( {  
    
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
            null,
            { "width": "10%" },
            { "width": "35%" },
            { "bSortable": false, "width": "10%" },
            { "bSortable": false }
        ],

        "dom": 'rt<"q5-table-navigation"ip><"clear">'
        //"dom": '<"top"ip>rt<"bottom"ip><"clear">'

    });


    // event listener on row reorder
    table.on( 'row-reorder', function ( e, diff, edit ) {

        // info on row that was moved and triggered event
        console.log(edit.triggerRow.data());
        
        // info on rows that changed their positions
        console.log(diff);


    });


});