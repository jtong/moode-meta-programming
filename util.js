function refresh_page() {
    var current_url = $(location).attr("href");
    var current_page = current_url.substr(current_url.indexOf("#") + 1)
    //console.log(window["go_to_" + current_page]);

    var current_page_param = localStorage.getItem("current_page_param");
    window["go_to_" + current_page](current_page_param);
}