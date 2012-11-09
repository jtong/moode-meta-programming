var root = this;

var __define_mdclass_base = function(class_name, request_url, extend_name) {
    var set_params_by_config = "if(typeof config !== 'undefined') {"
        + "for(var key in config) {this[key] = config[key];}"
        + "}";
    var request_url_init_string = "this.request_url = '" + request_url +"';";
    var pre_name_string = "this.pre_name = '" + class_name.toLowerCase() + "';";
    var eval_string = ["function ", class_name, "(config) {",
        set_params_by_config ,
        request_url_init_string ,
        pre_name_string,
        "}",
        class_name, ".prototype = new ", extend_name, "();"].join("");
    console.log(eval_string);
    root.eval(eval_string);
    return eval_string;
}

var __define_mdclass = function(class_name, request_url){
    return __define_mdclass_base(class_name, request_url, 'BaseClass');
}


var __define_page_mdclass = function(class_name, request_url){
    return __define_mdclass_base(class_name, request_url, 'PageBaseClass');
}