$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        method:"get",
        type:"json",
        url:"/employees",
        success:function(r){
            console.log(r);
            $.each(r,function(index,value){
                //console.log(value);
                $(".tree").append('<li id="li'+value['id']+'" class="unselectable" ><a class=" employee" href="#" data-id="'+value['id']+'" ><span title="name">'+value['name']+'</span></a> <span class="badge badge-secondary" title="job position">('+value['position']+')</span> <span class="badge badge-dark" title="salary">'+value['salary']+' $</span></li>');
            });
            employee();
        }
    });
});

var employee=function(){
    $(".employee").click(function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        var employee_id=$(this).attr("data-id");
        console.log(employee_id);
       
        
        $.ajax({
            method:'get',
            type:'json',
            url:'/employees/'+employee_id,
            success:function(r){
                console.log(r);
                $.each(r,function(index,value){
                    
                    $("#li"+employee_id).append('<ul><li id="li'+value['id']+'" class="unselectable"  ><a class=" employee" href="#" data-id="'+value['id']+'" ><span title="name">'+value['name']+'</span></a> <span class="badge badge-secondary" title="job position">('+value['position']+')</span> <span class="badge badge-dark" title="salary">'+value['salary']+' $</span> </li></ul>');
                   
                });
                employee();
            }
        })
    });
};