<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Employees;
use DB;

class EmployeesController extends Controller
{
    public function create_employee()
    {
        return array('employee created');
    }
    
    public function search(Request $request)
    {
        $search_request=$request->input('search_req');
        $search_option=$request->input('search_opt');
        $date_from=strtotime($request->input('date_from'));
        $date_to=strtotime($request->input('date_to'));
        $salary_from=(int)$request->input('salary_from');
        $salary_to=(int)$request->input('salary_to');
        
        $select_join=DB::table('employees as e1')->select(
            'e1.id',
            'e1.name as employee_name',
            'e2.name as boss_name',
            'e1.position',
            'e1.salary',
            'e1.hired'
        )->join('employees as e2', 'e2.id', '=', 'e1.boss_id');
            

        $get_data=array(
            'all'=>function ($sj, $r) {
                return $sj->where(function ($query) use ($r) {
                    $query->where('e1.name', 'like', '%'.$r.'%')->
                    orWhere('e1.position', 'like', '%'.$r.'%')->
                    orWhere('e1.salary', 'like', '%'.$r.'%')->
                    orWhere('e2.name', 'like', '%'.$r.'%');
                });
            },
            'name'=>function ($sj, $r) {
                return $sj->where('e1.name', 'like', '%'.$r.'%');
            },
            'position'=>function ($sj, $r) {
                return $sj->where('e1.position', 'like', '%'.$r.'%');
            },
            'salary'=>function ($sj, $r) {
                return $sj->where('e1.salary', 'like', '%'.$r.'%');
            },
            'boss'=>function ($sj, $r) {
                return $sj->where('e2.name', 'like', '%'.$r.'%');
            }
        );
        
        return $get_data[$search_option]($select_join, $search_request)->
        where(function ($query) use ($date_from,$date_to,$salary_from,$salary_to) {
            $query->where(
                [['e1.hired', '>', $date_from],
                ['e1.hired', '<', $date_to],
                ['e1.salary', '>', $salary_from],
                ['e1.salary', '<', $salary_to]]
            );
        })->paginate(30);
    }
}
