<?php
use App\Employees;
Route::get('/', function () {
    return view('tree');
})->name('tree');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/employees','TreeController@get_tree');
Route::get('/employees/{boss_id}','TreeController@get_employee');

Route::get('/search','EmployeesController@search');

Route::middleware(['auth'])->group(function(){
    //add new employe
    Route::post('/employee/add', function(){
        return array('add');
    });
});
