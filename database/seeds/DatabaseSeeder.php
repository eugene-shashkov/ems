<?php

use Illuminate\Database\Seeder;
use App\Employe;
use App\Department;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('employe')->delete();
  

        $faker = Faker\Factory::create();

    
      
        $employes_count=range(0,50);
        $boss_ids=array();
        foreach($employes_count as $i){
           
            $emp=Employe::create(array(
                'name'=> $faker->name,
                'position'=>$faker->jobTitle,
                'salary'=>mt_rand(400,20000)
            ));
            if($i<10){
                $boss_ids[]=$emp->id;
            }else{
                DB::table('employe')
                ->where('id', $emp->id)
                ->update(['boss_id' => $boss_ids[array_rand($boss_ids)]]);
            }
        }
    }
}
