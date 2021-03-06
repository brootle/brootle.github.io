$(document).ready(function(){

    console.log("payment history table script loaded");

    // Disable search and ordering by default
    $.extend( $.fn.dataTable.defaults, {
        searching: false
    } );

    $('#payment_history_table').dataTable( {

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

                    <div id="rows_number_selector" class="rows-number-selector-box rows-number-selector-box--big">
                        <label class="input-label"><span>Rows:</span></label>
                        <a><span>10</span></a>
                        <a><span>20</span></a>
                        <a><span>50</span></a>
                        <a><span>100</span></a>
                    </div>

                    <label class="table-label">Show on page:</label> <span id='rows_number' class='records-table-number'>_START_ - _END_</span> of _TOTAL_
                </div>
                <script>
                    // control table after it was initiates

                    var table = $('#payment_history_table').DataTable();

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
        "order": [],                // disable sort at the start
        "iDisplayLength": 5,
        "pagingType": "simple",     // see https://datatables.net/examples/basic_init/alt_pagination.html
        "dom": '<"top"ip>'         // see https://datatables.net/examples/basic_init/dom.html
    });

    // wrap top info bar and add date range
    $( ".top" ).wrap( "<div class='table-with-time-range'></div>" );
    // incert date range filter
    $( ".table-with-time-range" ).prepend( `

        <div class="filter-form">
            <form action="/filter" method="POST">
                <fieldset>

                    <div class="form-group">
                        <label class="text-gray">Show by period:</label>
                        <div class="filter-date" id="start_date">
                                                            
                        </div>
                        <span class="text-gray">‒</span>
                        <div class="filter-date" id="end_date">
                                                            
                        </div>
                    </div>

                    <button class="text-white blue-backgound" type="submit">Filter</button>                            
                        
                </fieldset>
            </form>                        
        </div>    

    
    ` );
    
    // insert date input fields and initiate datepicker
    function createDateInput() {
        $('<input type="text" id="history_date_start"  name="date[start]" autocomplete="off" placeholder="Choose date" />').appendTo("#start_date").datepicker();
        $('<input type="text" id="history_date_end"  name="date[end]" autocomplete="off" placeholder="Choose date" />').appendTo("#end_date").datepicker();
    };

    $(createDateInput);    


});
