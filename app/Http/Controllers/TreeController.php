<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Employees;
use App\EmployeeRelations;
use DB;
use Log;
class TreeController extends Controller
{
    public function get_bosses()
    {
        //return Employees::select('id', 'name', 'position', 'salary')->where('boss_id', '=', null)->orderBy('id','ASC')->get();

        //DB::connection()->enableQueryLog();
        $data=DB::table('employees as e1')->
        select(
            'e1.id as id',
            'e1.name as name',
            'e1.boss_id as boss_id',
            'e1.position as position',
            'e1.salary as salary',
            
            'e2.id as id_2',
            'e2.name as name_2',
            'e2.boss_id as boss_id_2',
            'e2.position as position_2',
            'e2.salary as salary_2'
           
        )->leftJoin('employees as e2', 'e1.id', '=', 'e2.boss_id')->
        where('e1.boss_id', '=', null)->limit(100)->get();
        //Log::debug(DB::getQueryLog());
        return $data;
    }
    
    public function get_employee($boss_id)
    {
        return Employees::select('id', 'name', 'position', 'salary')->where('boss_id', '=', $boss_id)->get();
    }
}
