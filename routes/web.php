<?php
use App\Employees;
Route::get('/', function () {
    return view('tree');
})->name('tree');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/employees','TreeController@get_bosses');
Route::get('/employee/{boss_id}','TreeController@get_employee');


Route::middleware(['auth'])->group(function(){
    /**
     *      CERATE
     */
    Route::post('/create/employee','EmployeesController@create_employee');
    /**
     *      READ
     */
    Route::get('/search','EmployeesController@search');
    Route::get('/employees/get_bosses/{boss}','EmployeesController@get_boss_name');
    /**
     *      UPDATE
     */
    Route::put('/update/employee','EmployeesController@update_employee');
    Route::put('/update/employee/boss','EmployeesController@update_boss');

    /**
     *      DELETE
     */
    Route::delete('/delete/employee','EmployeesController@delete_employee');

});
