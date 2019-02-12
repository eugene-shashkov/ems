<div class="text-center">
    <h1>Search</h1>
</div>
<div style="height:30px;"></div>
<div class="form-group row">
    <label for="search_req" class="col-sm-2 col-form-label">Search</label>
   
    <div class="col-sm-10">
        <div class="input-group ">
            <input id="search_req" class="form-control" autocomplete="false" placeholder="Search" title="Search" type="text">
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
