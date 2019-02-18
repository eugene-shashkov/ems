<div class="text-center">
    <h1>Create Employee</h1>
</div>
<div style="height:30px;"></div>
<div class="form-group row">
    <form id="create_emplloyee" action="/create/employee" method="post" ></form>
        <label for="create_name" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
            <input form="create_emplloyee" name="name"  type="text" class="form-control" placeholder="Name" required>
        </div>
</div>
<div class="form-group row">
    <label for="create_position" class="col-sm-2 col-form-label">Position</label>
    <div class="col-sm-10">
        <input form="create_emplloyee" name="position" type="text" class="form-control" placeholder="Position" required>
    </div>
</div>

<div class="form-group row">
    <label for="create_salary" class="col-sm-2 col-form-label">Salary</label>
    <div class="col-sm-10">
        <input form="create_emplloyee" name="salary"  type="number" step="1" min="0" class="form-control" placeholder="Salary" required>
    </div>
</div>

<div class="form-group row">
    <label for="create_hired" class="col-sm-2 col-form-label">Hired Date</label>
    <div class="col-sm-10">
        <input id="create_employee_hired" form="create_emplloyee" name="hired"  type="date" class="form-control" placeholder="Hired" required>
    </div>
</div>
<div style="height:30px;"></div>
<div class="text-center">
    <input  form="create_emplloyee" type="submit" class="btn btn-lg btn-primary create-new-employee" value="Create Employee" required>
</div>

<hr>
<div style="height:40px;"></div>
