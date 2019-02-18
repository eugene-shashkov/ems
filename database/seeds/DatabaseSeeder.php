<?php

use Illuminate\Database\Seeder;
use App\Employees;
// use App\EmployeeRelations;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $employees_count=100000;
        $number_of_tree_levels=10;

        DB::table('employees')->delete();
        
        $faker = Faker\Factory::create();
        $employes_range=range(0, $employees_count);
        $one_day=86400;
        $time_past=time()-$one_day*600;

        /**
         * fill employees data
         */
        foreach ($employes_range as $i) {
            Employees::create([
                'name'=> $faker->name,
                'position'=>$faker->jobTitle,
                'hired'=>mt_rand($time_past, time()),
                'salary'=>mt_rand(400, 20000)
            ]);
        }

        $all_employees=Employees::all();
        foreach ($all_employees as $each_emp) {
            $all_emps[]=$each_emp->id;
        }
        $emps_id_arr=array_chunk($all_emps, intval($employees_count/$number_of_tree_levels));
        foreach ($emps_id_arr as $key=>$each_emp_group) {
                foreach ($each_emp_group as $id_key=>$each_id) {
                    if (isset($emps_id_arr[$key+1][$id_key])) {
                        $update_emp=Employees::find($emps_id_arr[$key+1][$id_key]);
                        $update_emp->boss_id=$each_id;
                        $update_emp->save();
                    }
                }
        }
    }
}
