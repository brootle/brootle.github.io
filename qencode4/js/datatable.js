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
            info: `
                <div id='info-container'>

                    <div id="rows_number_selector">
                        <label class="input-label"><span>Rows:</span></label>
                        <a><span>10</span></a>
                        <a><span>20</span></a>
                        <a><span>50</span></a>
                        <a><span>100</span></a>
                    </div>

                    <span id='rows_number' class='transparent-green'>_START_ - _END_</span> of _TOTAL_
                </div>
                <script>
                    // control table after it was initiates

                    var table = $('#transfer_table').DataTable();

                    // handle events when we click 'rows_number' to change number of rows displayed
                    $('#rows_number').on('click', function(){
                        $('#rows_number_selector').toggle();
                    });

                    // see here https://datatables.net/reference/api/page.len()
                    $('#rows_number_selector a').on('click', function(){
                        table.page.len( $(this).text() ).draw(); 
                    });             

                    // hide when clicked anywhere outside
                    $(document).mouseup(function(e) 
                    {
                        var container = $('#rows_number_selector');

                        // if the target of the click isn't the container nor a descendant of the container
                        if (!container.is(e.target) && container.has(e.target).length === 0) 
                        {
                            container.hide();
                        }
                    });                    

                </script>
            `
        },

        "iDisplayLength": 5,
        "pagingType": "simple",     // see https://datatables.net/examples/basic_init/alt_pagination.html
        "dom": '<"top"ip>',         // see https://datatables.net/examples/basic_init/dom.html
        "aoColumns": [
        null,
        null,
        { "bSortable": false }
        ] } 
    );

});