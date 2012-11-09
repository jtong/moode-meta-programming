var default_page ="1";
var default_per_page = "30";

function deal_with_object_value(key_prefix, object_value, deal_with_final_value) {
    for (var field in object_value) {
        var key = key_prefix + "__" + field;
        var value = object_value[field];
        deal_with_each_original_property(key, value, deal_with_final_value);
    }
}

function deal_with_each_original_property(key_prefix, property_value, deal_with_final_value) {
    if (typeof property_value == "object") {
        deal_with_object_value(key_prefix, property_value, deal_with_final_value);
    } else {
        deal_with_final_value(key_prefix, property_value);
    }
}

function BaseClass(){
}

BaseClass.prototype.base_send_object = function() {
    var send_string_object = {};
    for(var param in this.params) {
        send_string_object[param] = this.params[param];
    }
    return send_string_object;
}

BaseClass.prototype.get_default_send_string = function () {
    return this.base_send_object();
}

BaseClass.prototype.get_send_string_object = function(){
    var send_string_object = this.get_default_send_string();
    this.specific_property(send_string_object);
    return send_string_object;
}

BaseClass.prototype.get_url = function(url) {
    return 'http://192.168.0.84:3000' + url;
}

BaseClass.prototype.query_data = function(send_string_object, related_url) {
    if (this.specific_request_url) {
        related_url = this.specific_request_url;
        this.specific_request_url = null;
    }
    var me = this;
    $.ajax({
        context:me,
        url: me.get_url(related_url),
        type: me.ajax_type || 'get',
        dataType:'json',
        data:me.get_send_string_object(),
        success:me.refresh_view,
        error:function (jqXHR, textStatus, error) {
            if (textStatus === "timeout") {
                alert("connect timeout, try to login again");
            } else {
                alert(error);
            }
        },
        statusCode:{
            302:function () {
                alert('please logon.');
            }
        },
        timeout:me.timeout || 10000
    });
}

BaseClass.prototype.specific_property = function(){
}

BaseClass.prototype.load_and_then = function(next_step){
    this.query_data(this.get_send_string_object(), this.request_url);
    next_step();
}

BaseClass.prototype.map_to_view= function(property_name, sub_property_name){
    var property_value = this[property_name];
    var result = this.pre_name + "__" + property_name;
    if( typeof property_value == "object" ){
        result+= "__" + sub_property_name;
    };
    return result;
}

BaseClass.prototype.for_each_property=function(jsonObject, deal_with_final_value){
    var me = this;
    var property_list = [];
    for( var key in jsonObject){
        this[key] = jsonObject[key];
        property_list.push(key);
    }
    $(property_list).each(function(index, item){
        var property_value = me[item];
        var key_prefix = me.map_to_view(item);
        deal_with_each_original_property(key_prefix, property_value, deal_with_final_value);
    });
}

BaseClass.prototype.check_data = function(data) {
    if(data.status != 'ok') {
        return false;
    }
    if(data.results.length <= 0) {
        return false;
    }
    return true;
}

function PageBaseClass(){
}

PageBaseClass.prototype = new BaseClass();

PageBaseClass.prototype.get_default_send_string = function () {
    var send_string_object = this.base_send_object();
    return send_string_object;
}
