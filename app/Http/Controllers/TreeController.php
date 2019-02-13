<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Employees;
use App\EmployeeRelations;
// use Illuminate\Support\Facades\DB;
class TreeController extends Controller
{
    public function get_bosses()
    {
        return Employees::select('id','name','position','salary')->where('boss_id','=',NULL)->get();
    }
    
    public function get_employee($boss_id){
        return Employees::select('id','name','position','salary')->where('boss_id','=',$boss_id)->get();
    }
}
