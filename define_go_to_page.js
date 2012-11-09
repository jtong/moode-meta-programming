var root = this;

var __define_go_to_page_base = function () {

}
__define_go_to_page_base.prototype.get_class_name = function (name) {
    var name_array = name.split('_');
    var class_name = '';
    for (var i = 0; i < name_array.length; i++) {
        class_name += name_array[i].replace(name_array[i][0], name_array[i][0].toUpperCase());
    }
    return class_name;
}

__define_go_to_page_base.prototype.deal_object = function (page_obj) {
    for (var key in page_obj) {
        var eval_string = ['function go_to_', key, '_page(){',
            '(', page_obj[key].toString(), ')()',
            '}'].join('');
        return eval_string;
    }
    return '';
}

__define_go_to_page_base.prototype.deal_page = function (page_obj) {
    var name = page_obj.substring(1);
    var eval_string = ['function go_to_' , name, '_page() {',
        '$(location).attr("href", "#', name, '_page");',
        '}'].join('');
    return eval_string;
}

__define_go_to_page_base.prototype.deal_load = function (page_obj) {
    var name = page_obj;
    var class_name = this.get_class_name(name);
    var eval_string = ['function go_to_', name, '_page(config) {',
        'new ', class_name, '(config).load_and_then(function() {',
        '$(location).attr("href", "#', name, '_page");',
        '});',
        'localStorage.setItem("current_page_param", config);',
        '}'].join('');
    return eval_string;
}

__define_go_to_page_base.prototype.deal_string = function (str) {
    return str.indexOf('#') === 0 ? this.deal_page(str) : this.deal_load(str);
}

__define_go_to_page_base.prototype.deal = function (page_obj) {
    var me = this;
    var map_function = {
        'object':me.deal_object,
        'string':me.deal_string
    }
    if (typeof map_function[typeof page_obj] === 'function') {
        return map_function[typeof page_obj].call(me, page_obj);
    }
    return '';
}

var __define_go_to_page = function (page_list) {
    var eval_string_array = [];
    for (var i = 0; i < page_list.length; i++) {
        eval_string_array.push(new __define_go_to_page_base().deal(page_list[i]));
    }
    root.eval(eval_string_array.join(''));
}

