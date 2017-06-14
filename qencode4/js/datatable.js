$(document).ready(function(){

    // Disable search and ordering by default
    $.extend( $.fn.dataTable.defaults, {
        searching: false
    } );

    $('#transfer_table').dataTable( {

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
            // see https://datatables.net/reference/option/language.info
            info: "<span class='transparent-green'>_START_ - _END_</span> of _PAGE_"
        },

        "iDisplayLength": 5,
        "pagingType": "simple",     // see https://datatables.net/examples/basic_init/alt_pagination.html
        "dom": '<"top"ip>',         // see https://datatables.net/examples/basic_init/dom.html
        "aoColumns": [
        null,
        null,
        { "bSortable": false }
        ] } );

});