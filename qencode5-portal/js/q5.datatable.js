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
            { "width": "10%" },
            { "width": "10%" },
            { "width": "33%" },
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
            { "width": "20%" },
            { "width": "20%" },
            { "width": "35%" },
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
            { "width": "18%" },
            { "width": "24%" },
            { "width": "42%" },
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



    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////    

    var encodingProfilesTable = $('#encoding_profiles_table').DataTable( {  
    
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
    encodingProfilesTable.on( 'row-reorder', function ( e, diff, edit ) {

        // info on row that was moved and triggered event
        console.log(edit.triggerRow.data());
        
        // info on rows that changed their positions
        console.log(diff);


    });       


    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////       

    var projectsTable = $('#projects_table').DataTable( {  
    
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
    projectsTable.on( 'row-reorder', function ( e, diff, edit ) {

        // info on row that was moved and triggered event
        console.log(edit.triggerRow.data());
        
        // info on rows that changed their positions
        console.log(diff);


    });       


    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////    

    var transcodingJobsTable = $('#transcoding_jobs_table').DataTable( {  
    
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
            { "bSortable": false },
            { "bSortable": false },
            { "bSortable": false , "width": "15%" },
            { "bSortable": false , "width": "10%" },
            { "bSortable": false , "width": "19%" },
            { "bSortable": false , "width": "15%" }
        ],

        "dom": 'rt<"q5-table-navigation"ip><"clear">'
    });       
 
    // insert empty hidden row with ID after table was initiated
    let transcodingJobsTableRowsIDs = document.querySelectorAll('#transcoding_jobs_table tbody tr .q5-table-dropdown'); 
    transcodingJobsTableRowsIDs.forEach(id => {
        id.closest("tr").insertAdjacentHTML('afterend', `<tr class="q5-table-dropdown-content q5-hidden" id="${id.textContent}"><td></td><td colspan="6">Downloading data...</td></tr>`);
    });

    // now let's download data for each row
    let transcodingJobsTableRowsWithContent = document.querySelectorAll('.q5-table-dropdown-content'); 
    transcodingJobsTableRowsWithContent.forEach(row => {

        // download data from JSON and isert it
        $.getJSON(`transcoding_jobs_${row.id}.json`)
        .done(function(data, textStatus, jqXHR) {
            
            console.log(data);
            row.innerHTML=`<td></td><td colspan="6">
            
                <div class="transcoding-jobs-details">
                    <div class="project-headers">
                        <div class="q5-input-container">
                            <div class="q5-input-label q5-text-gray">
                                <label>Job ID</label>
                            </div>                         
                            <input class="q5-text-gray" placeholder="" type="text" value="${data.job_id}" readonly>      
                        </div>       
                        <div class="q5-input-container">
                            <div class="q5-input-label q5-text-gray">
                                <label>Project</label>
                            </div>                         
                            <input class="q5-text-gray" placeholder="" type="text" value="${data.project}" readonly>      
                        </div>                                                                   
                    </div>
                    <div class="project-logs">
                        <div class="q5-input-container">
                            <div class="q5-input-label q5-text-gray">
                                <label>Execution log</label>
                            </div>    
                            <div class="transcoding-jobs-table">
                                <table>
                                    <tr><td>Created</td><td>${data.execution_log.created}</td></tr>
                                    <tr><td>Downloaded</td><td>${data.execution_log.downloaded}</td></tr>
                                    <tr><td>Queued</td><td>${data.execution_log.queued}</td></tr>
                                    <tr><td>Encoding</td><td>${data.execution_log.encoding}</td></tr>
                                    <tr><td>Saving</td><td>${data.execution_log.saving}</td></tr>
                                    <tr><td>Completed</td><td>${data.execution_log.completed}</td></tr>
                                </table> 
                            </div>                        
                        </div>                                           
                        <div class="q5-input-container">
                            <div class="q5-input-label q5-text-gray">
                                <label>Input info</label>
                            </div>                         
                            <div class="transcoding-jobs-table">
                                <table>
                                    <tr><td>Video Length</td><td>${data.input_info.video_length}</td></tr>
                                    <tr><td>Format</td><td>${data.input_info.format}</td></tr>
                                    <tr><td>Size</td><td>${data.input_info.size}</td></tr>
                                    <tr><td>Video Codec</td><td>${data.input_info.video_codec}</td></tr>
                                    <tr><td>Audio Codec</td><td>${data.input_info.audio_codec}</td></tr>
                                    <tr><td>Resolution</td><td>${data.input_info.resolution}</td></tr>
                                </table> 
                            </div>   
                        </div>   
                    </div>
                </div>
                <div class="transcoding-jobs-output-info">
                    <div class="q5-input-container">
                        <div class="q5-input-label q5-text-gray">
                            <label>Output Info</label>
                        </div>    
                        <div class="transcoding-jobs-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Profile</th>
                                        <th>Format</th>     
                                        <th>Size</th>       
                                        <th>Video Codec</th>     
                                        <th>Audio Codec</th>        
                                        <th>Resolution</th>     
                                        <th>Actions</th>                   
                                    </tr>
                                </thead>                                            
                                <tbody>
                                    ${data.output_info.map(row => 
                                        `<tr>
                                            <td>${row.profile}</td>
                                            <td>${row.format}</td>
                                            <td>${row.size}</td>
                                            <td>${row.video_codec}</td>
                                            <td>${row.audio_codec}</td>
                                            <td>${row.resolution}</td>
                                            <td></td>
                                        </tr>`)
                                    .join('\n      ')}
                                </tbody>
                            </table> 
                        </div>                        
                    </div>    
                </div>            
            
            </td>`;

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // log error to browser's console
            console.log(errorThrown.toString());
        });        

    });   

    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////       


    // find all "q5-tabcontent-with-tables" and remove this style
    // basically we hide inactive content after tables were initiated
    // we need to initate tables when they are displayed in order to set widths of columns
    const tabContentWithTables = document.querySelectorAll('.q5-tabcontent-with-tables');
    tabContentWithTables.forEach(tabContent => {
        tabContent.classList.remove("q5-tabcontent-with-tables");
    });          

    // add "q5-hidden" class to "add_encoding_profile_form" 
    // it will be shown after "add_encoding_profile_button" clicked
    if(document.querySelector('#add_encoding_profile_form')){
        document.querySelector('#add_encoding_profile_form').classList.add("q5-hidden");
    }


    // check this to fix columns width after table is shown
    // https://datatables.net/reference/api/responsive.recalc()

});