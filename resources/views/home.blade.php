@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-11">
            <div class="card">
                <div class="card-header">Home</div>
                <div class="card-body">
                    <h1>Create Employee</h1>
                    <div class="form-group row">
                        <label for="create_name" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input id="create_name" type="text" class="form-control" placeholder="Name">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="create_position" class="col-sm-2 col-form-label">Position</label>
                        <div class="col-sm-10">
                            <input id="create_position" type="text" class="form-control" placeholder="Position">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="create_salary" class="col-sm-2 col-form-label">Salary</label>
                        <div class="col-sm-10">
                            <input id="create_salary" type="number" step="1" min="0" class="form-control" placeholder="Salary">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="create_hired" class="col-sm-2 col-form-label">Hired Date</label>
                        <div class="col-sm-10">
                            <input id="create_hired" type="date" class="form-control" placeholder="Hired">
                        </div>
                    </div>
                    <div style="height:30px;"></div>
                    <div class="text-center">
                        <a href="#" class="btn btn-lg btn-primary">Create Employee</a>
                    </div>
                    <hr>
                    <div style="height:40px;"></div>

                    <h1>Search</h1>
                    <div class="form-group row">
                        <label for="search_req" class="col-sm-2 col-form-label">Search</label>
                        <div class="col-sm-10">
                            <div class="input-group ">
                                <input id="search_req" class="form-control" autocomplete="false" placeholder="Search"
                                    title="Search" type="text">
                                <div class="input-group-append">
                                    <select id="search_opt" class="form-control" title="Search By">
                                        <option value="all">All</option>
                                        <option value="name">Name</option>
                                        <option value="position">Position</option>
                                        <option value="salary">Salary</option>
                                        <option value="boss">Boss</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="date_from" class="col-sm-2 col-form-label">From/To Date</label>
                        <div class="col-sm-10">
                            <div class="input-group">
                                <input id="date_from" type="date" value="2017-01-01" class="form-control">
                                {{-- yyyy-MM-dd --}}
                                <input id="date_to" type="date" value="2019-01-01" class="form-control">
                            </div>
                        </div>
                    </div>


                    <div class="form-group row">
                        <label for="salary_from" class="col-sm-2 col-form-label">From/To Salary</label>
                        <div class="col-sm-10">
                            <div class="input-group">
                                <input id="salary_from" type="number" step="1" value="1" class="form-control">
                                <input id="salary_to" type="number" step="1" value="9999999" class="form-control">
                            </div>
                        </div>
                    </div>

                    <div style="height:30px;"></div>
                    <div class="text-center">
                        <a id="search_btn" href="#" class="btn btn-primary btn-lg" title="Press This Button To Search">Search</a>
                    </div>
                    <div style="height:30px;"></div>
                    {{-- <input id="current_page" type="number" value="1"> --}}

                    <div id="pagination"></div>



                    <table class="table employees_table">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Position</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Hired</th>
                                <th scope="col">Boss</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
