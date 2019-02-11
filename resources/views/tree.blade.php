@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Tree View For Employes</div>
                <div class="card-body">
                    <ul class="tree"></ul>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="/employees"></script>
@endsection
