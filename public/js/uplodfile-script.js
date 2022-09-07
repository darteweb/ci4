
function set_uploadifive_script(field, file_size='', field_title='', timestamp, unique_salt, file_type='', app_post='', location='', controller='')
{   
 
    if(file_size == ''){
     var file_size = '1536'; }

    if(field_title == '') {
     var field_title = 'Upload Doc.'; }

    // if(timestamp == '') {
    //  var timestamp = Date.now(); }
    
    if(file_type == ''){ 
      var file_type = 'pdf,jpg,jpeg,png';
    }
    
    if(controller == '') {
     var controller = 'apply';
    }
      
        jQuery('#'+ field).uploadifive({
                'fileSizeLimit' : file_size,
                'buttonText'   : field_title,
                'auto'             : true,
                'checkScript'      : '',
                'onAddQueueItem' : function(queue) {
                    jQuery(".preload_area").show();
                },
                'formData'         : {
                                        'timestamp' : timestamp,
                                        'token'     : unique_salt,
                                        'app_post'    : app_post,
                                        'location'    : location,
                                     },
                'queueID'          : 'queue_'+ field,
                'uploadScript'     : siteurl + controller + '/upload_file/'+ field,
                'onError'      : function(errorType) {
                       jQuery(".preload_area").hide();
                       jQuery("#uploadifive-"+ field).removeClass('success');
                },
                'onUploadComplete' : function(file, data) {
                    console.log(data); 
                    jQuery(".preload_area").hide();   
                    jQuery('#hid_'+ field).val(data);
                    jQuery('#hid_'+ field +'-error').hide();
                    jQuery("#"+ field +"-display").html("");						
                    jQuery("#"+ field +"-display").load(siteurl + controller + "/upload_display/upload_image_display");
                    jQuery(".uploadifive-queue-item").delay(3000).fadeOut();
                    jQuery("#uploadifive-"+ field).addClass('success');
                }
        });
}


function set_uploadifive_html(field, field_title='', filename='', file_type='', req='')
{   

    if(field_title == '') {
     var field_title = 'Upload Doc.'; }

    if(file_type == ''){ 
      var file_type = 'pdf,jpg,jpeg,png';
    }
    if(filename =='')
    {
        filename = 'hid_'+ field;
    }

    var div = document.createElement("div");
    div = '<div id="queue_'+ field +'"></div><input id="'+ field +'" name="'+ field +'" type="file"><input id="hid_'+ field +'" name="'+ filename +'" '+req+' value="" type="hidden"><div class="col-md-12 nopadding pull-left" style="margin-top:10px;" id="'+ field +'-display"></div>';
    return div;
}
