var current_page = 1;
var employees_table_selector = '.employees_table tbody';
var last_page;
var data;

$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
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
    $(".tabs-page").click(function (e) {
        e.preventDefault();
        $(".tabs-page").removeClass("active");
        $(this).addClass("active");
        $(".tabs-content").hide();
        var show_selector = $(this).attr("data-display-class");
        $(show_selector).show();
    });

    $("#create_emplloyee").submit(function (e) {
        e.preventDefault();
        var form = $("#create_emplloyee");
        var data = getFormData(form);
        $.ajax({
            method: "post",
            type: "json",
            url: "/create/employee",
            data: data,
            success: function (r) {
                console.log(r);
                alert("Position Created");
                document.getElementById("create_emplloyee").reset();
            },
            error: function (xhr, status) {
                alert('Error status: ' + status);
            }
        });
    });

    $("#create_employee_hired").val(set_today_into_date_inp());

    $('body').click(function (e) {
        $(".bosses-div").empty();
    });

  
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
                var boss_name = each_employee['boss_name'];
                if (boss_name == null) {
                    boss_name = '';
                }
                var id = each_employee['id'];
                $(employees_table_selector).append(
                    '<tr id="tr' + id + '" data-id="' + id + '">' +
                    '<td title="Name"><img src="/images/default.jpg" width="32" height="32" ></td>' +
                    '<td title="Name"><input type="text" value="' + each_employee['employee_name'] + '" data-id="' + id + '" data-field-name="name" class="form-control update_field"   ></td>' +
                    '<td title="Position"><input type="text" value="' + each_employee['position'] + '" data-id="' + id + '" data-field-name="position" class="form-control update_field"></td>' +
                    '<td title="Salary"><input type="number" step="1" value="' + each_employee['salary'] + '" data-id="' + id + '" data-field-name="salary"  class="form-control update_field" ></td>' +
                    '<td title="YYYY-MM-DD"><input type="date" value="' + unix_to_date(each_employee['hired']) + '" data-id="' + id + '" data-field-name="hired" class="form-control update_field"></td>' +
                    '<td title="Boss" ><input type="text" value="' + boss_name + '" class="form-control boss_name" data-id="' + id + '"><div class="bosses-div boss_div_' + id + '" ></div></td>' +
                    '<td title="Delete Position" ><a class="delete-position btn btn-outline-dark cursor-pointer" data-id="' + id + '" href="#" ><i class="fas fa-trash-alt"  ></i></a></td>' +
                    '</tr>');
            });
            $(".update_field").change(function () {
                var field = $(this).attr("data-field-name");
                var id = $(this).attr("data-id");
                var value = $(this).val();
                // console.log(field,id,value);
                update(field, id, value);
            });
            $(".update_field").keyup(function () {
                var field = $(this).attr("data-field-name");
                var id = $(this).attr("data-id");
                var value = $(this).val();
                // console.log(field,id,value);
                update(field, id, value);
            });

            change_boss();
            delete_position();
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
};

var unix_to_date = function (unix) {
    var date = new Date(unix * 1000);
    var month = (date.getMonth() + 1);
    var day = date.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    return date.getFullYear() + '-' + month + '-' + day;
};

var pagination = function (last_page) {
    $("#pagination").twbsPagination({
        totalPages: last_page,
        visiblePages: 6,
        initiateStartPageClick: false,
        onPageClick: function (event, page) {
            console.log("page_to_show " + page);
            get_search_result(page);
        }
    });
};

var update = function (field, position_id, value) {
    $.ajax({
        method: "put",
        type: "json",
        data: {
            'position_id': position_id,
            'field': field,
            'value': value
        },
        url: "/update/employee",
        success: function (r) {
            console.log(r);
        }
    });
};



var change_boss = function () {
    $(".boss_name").keyup(function (e) {
        var boss_name_to_search = $(this).val();
        var employee_id = $(this).attr("data-id");
        var boss_div_class = '.boss_div_' + employee_id;
        var boss_input = this;
        $(boss_div_class).empty();
        console.log(boss_name_to_search);
        $.ajax({
            method: 'get',
            type: 'json',
            url: '/employees/get_bosses/' + boss_name_to_search,
            success: function (r) {
                console.log(r);

                var bosses_string = '<ul class="list-group" style="position:absolute">';
                $.each(r, function (index, value) {
                    bosses_string += '<li class="list-group-item cursor-pointer" data-boss-id="' + value['id'] + '" data-boss-name="' + value['name'] + '" >' + value['name'] + '</li>';
                });
                bosses_string += '</ul>';
                console.log(bosses_string);
                $(boss_div_class).append(bosses_string);
                $(boss_div_class + " .list-group-item").hover(
                    function () {
                        $(this).addClass('active')
                    },
                    function () {
                        $(this).removeClass('active')
                    }
                );

                $(boss_div_class + " .list-group-item").click(function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    $(boss_input).val($(this).attr("data-boss-name"));
                    var new_boss_id = $(this).attr("data-boss-id");
                    var data = {
                        employee_id: employee_id,
                        boss_id: new_boss_id
                    };
                    $.ajax({
                        method: 'put',
                        type: 'json',
                        data: data,
                        url: '/update/employee/boss',
                        success: function (r) {
                            console.log(r);
                        },
                        error: function (xhr, status) {
                            alert('Error status: ' + status);
                        }
                    });
                    $(".bosses-div").empty();
                });
            }
        })
    });
};

var delete_position = function () {
    $(".delete-position").click(function (e) {
        e.preventDefault();
        var position_id = $(this).attr("data-id");
        var tr_selector = "#tr" + position_id;
        $.ajax({
            method: 'delete',
            data: {
                position_id: position_id
            },
            url: '/delete/employee',
            success: function (r) {
                $(tr_selector).remove();
            },
            error: function (error, code) {
                alert("Error: " + code);
            }
        });
    });

};



function getFormData(form) {
    var unindexed_array = form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });
    return indexed_array;
};
