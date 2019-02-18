<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Employees;
use DB;
use Log;
class EmployeesController extends Controller
{
    public function create_employee(Request $request, Employees $emp)
    {
        $emp->name=$request->input('name');
        $emp->position=$request->input('position');
        $emp->salary=$request->input('salary');
        $emp->hired=strtotime($request->input('hired'));
        $emp->save();
    }
    
    public function search(Request $request)
    {
        $search_request=$request->input('search_req');
        session(['last_request'=>$search_request]);
        
        
        $search_option=$request->input('search_opt');
        $date_from=strtotime($request->input('date_from'));
        $date_to=strtotime($request->input('date_to'));
        $salary_from=$request->input('salary_from');
        $salary_to=$request->input('salary_to');
        //DB::connection()->enableQueryLog();
        $select_join=DB::table('employees as e1')->select(
            'e1.id',
            'e1.name as employee_name',
            'e2.name as boss_name',
            'e1.position',
            'e1.salary',
            'e1.hired'
        )->leftJoin('employees as e2', 'e2.id', '=', 'e1.boss_id');

        $get_data=array(
            'all'=>function ($sj, $r) {
                return $sj->where(function ($query) use ($r) {
                    $query->where('e1.name', 'like', '%'.$r.'%')->
                    orWhere('e1.position', 'like', '%'.$r.'%')->
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
        
         $data=$get_data[$search_option]($select_join, $search_request)->
        where(function ($query) use ($date_from,$date_to,$salary_from,$salary_to) {
            $query->where(
                [['e1.hired', '>=', $date_from],
                ['e1.hired', '<=', $date_to],
                ['e1.salary', '>=', $salary_from],
                ['e1.salary', '<=', $salary_to]]
            );
        })->orderBy('e1.id', 'ASC')->paginate(30);
        //Log::debug(DB::getQueryLog());
        return $data;
    }

    public function get_boss_name(Employees $emp, $boss)
    {
        return $emp::select('id', 'name')->where('name', 'like', '%'.$boss.'%')->limit(10)->get();
    }


    public function update_employee(Employees $emp, Request $request)
    {
        $position_id=(int)$request->input('position_id');
        $field=$request->input('field');
        $value=$request->input('value');

        $update=array(
            'name'=>function () use ($emp,$position_id,$value) {
                $emp::where('id', '=', $position_id)->update(['name' => $value]);
                ;
            },
            'position'=>function () use ($emp,$position_id,$value) {
                $emp::where('id', '=', $position_id)->update(['position' => $value]);
                ;
            },
            'salary'=>function () use ($emp,$position_id,$value) {
                $emp::where('id', '=', $position_id)->update(['salary' => $value]);
                ;
            },
            'hired'=>function () use ($emp,$position_id,$value) {
                $value=strtotime($value);
                $emp::where('id', '=', $position_id)->update(['hired' => $value]);
                ;
            }
        );
        $update[$field]();
        return array($position_id,$field,$value);
    }

    public function update_boss(Employees $emp, Request $request)
    {
        // employee_id:employee_id,
        // boss_id:new_boss_id
        $employee_id=$request->input('employee_id');
        $boss_id=$request->input('boss_id');
        $emp::where('id', '=', $employee_id)->update(['boss_id'=>$boss_id]);
    }


    public function delete_employee(Employees $emp, Request $request){
        Employees::where('id',$request->input('position_id'))->delete();
    }
}
