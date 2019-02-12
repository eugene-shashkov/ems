@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">

        <div class="col-md-11">
            <div class="card">

              
                <div class="card-body">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link tabs-page active" data-display-class=".content-search" href="#">Search</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link tabs-page " data-display-class=".content-create-employee" href="#">Create Employee</a>
                        </li>
                    </ul>
                    <div style="height:30px;"></div>
                    <div class="tabs-content content-search" >
                        @include('search')
                    </div>
                    <div class="tabs-content content-create-employee" style="display:none;" >
                        @include('createemployee')
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
