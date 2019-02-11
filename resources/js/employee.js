var current_page = 1;
var employees_table_selector = '.employees_table tbody';
var last_page;
var data;
$(document).ready(function () {
    // console.log(get_search_result());;

    get_search_result();
    $("#search_btn").click(function (e) {

        e.preventDefault();
        $('#pagination').empty();
        $('#pagination').removeData("twbs-pagination");
        $('#pagination').unbind("page");
        get_search_result();
    });
    $("#create_hired").val(set_today_into_date_inp());
    $("#date_to").val(set_today_into_date_inp());


});

var get_search_result = function (page = 1) {
    var search_req = $("#search_req").val();
    var search_opt = $("#search_opt").val();
    var date_from = $("#date_from").val();
    var date_to = $("#date_to").val();
    var salary_from = $("#salary_from").val();
    var salary_to = $("#salary_to").val();
    $.ajax({
        method: 'get',
        type: 'json',
        url: '/search',
        data: {
            'page': page,
            'search_req': search_req,
            'search_opt': search_opt,
            'date_from': date_from,
            'date_to': date_to,
            'salary_from': salary_from,
            'salary_to': salary_to
        },
        success: function (r) {
            console.log(r);
            respond = r;
            current_page = r['current_page'];
            last_page = r['last_page'];
            data = r['data'];
            pagination(last_page);
            $(employees_table_selector).empty();
            $.each(data, function (index, each_employee) {
                //console.log(each_employee);
                $(employees_table_selector).append(
                    '<tr data-id="' + each_employee['id'] + '">' +
                    '<td title="Name"><img ></td>' +
                    '<td title="Name"><input type="text" value="' + each_employee['employee_name'] + '" class="form-control" ></td>' +
                    '<td title="Position"><input type="text" value="' + each_employee['position'] + '" class="form-control"></td>' +
                    '<td title="Salary"><input type="number" step="1" value="' + each_employee['salary'] + '"  class="form-control" ></td>' +
                    '<td title="YYYY-MM-DD"><input type="date" value="' + unix_to_date(each_employee['hired']) + '" class="form-control"></td>' +
                    '<td title="Boss"><input type="text" value="' + each_employee['boss_name'] + '" class="form-control"></td>' +
                    '</tr>');
            });
            

        }
    });

};

var set_today_into_date_inp = function () {
    var now = new Date();
    var month = (now.getMonth() + 1);
    var day = now.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    return today;
}


var unix_to_date = function (unix) {
    var date = new Date(unix * 1000);
    var month = (date.getMonth() + 1);
    var day = date.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    return date.getFullYear() + '-' + month + '-' + day;
}


var pagination = function (last_page) {

    $("#pagination").twbsPagination({
        totalPages: last_page,
        visiblePages: 6,
        initiateStartPageClick: false,
        // next: 'Next',
        // prev: 'Prev',
        onPageClick: function (event, page) {
            console.log("page_to_show " + page);
            get_search_result(page);
        }
    });
}

var updater=function(){
    
}