$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        method: "get",
        type: "json",
        url: "/employees",
        success: function (r) {
            console.log(r);
            $.each(r, function (index, value) {
                //console.log(value);
                $(".tree").append('<li id="li' + value['id'] + '" class="unselectable" ><a class=" employee" href="#" data-id="' + value['id'] + '" ><span title="name">' + value['name'] + '</span></a> <span class="badge badge-secondary" title="job position">(' + value['position'] + ')</span> <span class="badge badge-dark" title="salary">' + value['salary'] + ' $</span></li>');
                if( value['name_2']!=null){
                    $("#li" + value['id']).append('<ul><li id="li' + value['id_2'] + '" class="unselectable"  ><a class=" employee" href="#" data-id="' + value['id_2'] + '" ><span title="name">' + value['name_2'] + '</span></a> <span class="badge badge-secondary" title="job position">(' + value['position_2'] + ')</span> <span class="badge badge-dark" title="salary">' + value['salary_2'] + ' $</span> </li></ul>');
                }
            });
            employee();
        }
    });
});

var employee = function () {
    $(".employee").click(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var employee_id = $(this).attr("data-id");
        if (!$("#li" + employee_id).find("ul").length) {
            $.ajax({
                method: 'get',
                type: 'json',
                url: '/employee/' + employee_id,
                success: function (r) {
                    console.log(r);
                    $.each(r, function (index, value) {
                        $("#li" + employee_id).append('<ul><li id="li' + value['id'] + '" class="unselectable"  ><a class=" employee" href="#" data-id="' + value['id'] + '" ><span title="name">' + value['name'] + '</span></a> <span class="badge badge-secondary" title="job position">(' + value['position'] + ')</span> <span class="badge badge-dark" title="salary">' + value['salary'] + ' $</span> </li></ul>');
                    });
                    employee();
                }
            })
        }
    });
};
