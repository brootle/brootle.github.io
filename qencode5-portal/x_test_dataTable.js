$(document).ready(function(){

    // Disable search and ordering by default
    $.extend( $.fn.dataTable.defaults, {
        searching: false
    } );

    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////    

    // $('#example').DataTable( {
    //     "ajax": '../ajax/data/x_test_dataTable.txt'
    // } );    

    var testTable = $('#test_table').DataTable( {  

        "ajax": 'x_test_dataTable.txt',
    
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
            { "width": "31%" },
            { "width": "49%" },
            { "bSortable": false, "width": "13%" },
            { "bSortable": false,  "width": "7%" }
        ],

        "dom": 'rt<"q5-table-navigation"ip><"clear">'

    });    

    // event listener on row reorder
    testTable.on( 'row-reorder', function ( e, diff, edit ) {

        // info on row that was moved and triggered event
        console.log(edit.triggerRow.data());
        
        // info on rows that changed their positions
        console.log(diff);


    });       


    //////////////////////

    // var newRow = jQuery(`
    //     <tr>
    //         <td>4</td>
    //         <td>test_added</td>
    //         <td>jjjjjjjjjjjjjjjjjjjjj</td>
    //         <td>
    //             <div class="q5-action-buttons-group">
    //                 <a class="q5-action-button--edit"></a>
    //                 <a class="q5-action-button--copy"></a>
    //                 <a class="q5-action-button--delete"></a>
    //             </div>
    //         </td>
    //         <td>
    //             <div class="q5-action-buttons-group">
    //                 <a class="q5-action-button--drag"></a>
    //             </div>                                                    
    //         </td>
    //     </tr>                                                                                                                                                                                                          
    // `);
    // $('#encoding_profiles_table').append(newRow);

    // convert html table to JSON data
    // destroy table oject
    // initiate table object with JSON data

    //encodingProfilesTable.destroy();
    
    //encodingProfilesTable.destroy();

    // $('#encoding_profiles_table tbody').on( 'click', 'td', function () {
    //     var cell = encodingProfilesTable.cell( this );
    //     cell.data( cell.data() + 1 ).draw();
    //     // note - call draw() to update the table's draw state with the new data
    // } );

});    