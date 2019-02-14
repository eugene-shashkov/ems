<?php
use App\Employees;
Route::get('/', function () {
    return view('tree');
})->name('tree');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/employees','TreeController@get_bosses');
Route::get('/employees/{boss_id}','TreeController@get_employee');


Route::middleware(['auth'])->group(function(){
    /**
     * CRUD
     */
    Route::get('/search','EmployeesController@search');
    Route::post('/create/employee','EmployeesController@create_employee');
    Route::put('/update/employee','EmployeesController@update_employee');
    Route::delete('/update/employee','EmployeesController@update_employee');
});
