<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Requirement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RequirementController extends Controller
{
    //This method will return all requirement of a course
    public function index(Request $request){
        $requirements = Requirement::where('course_id',$request->course_id)->orderBy('sort_order','ASC')->get();

        return response()->json([
            'status'=>200,
            'data'=>$requirements
        ],200);
    }
    // This method will store/save a requirements
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'requirement'=>'required',
            'course_id'=>'required'
        ]);

        if($validator->fails()){
             return response()->json([
            'status'=>400,
            'errors'=>$validator->errors()
        ],400);
        }

        $requirement = new Requirement();
        $requirement->course_id = $request->course_id;
        $requirement->text= $request->requirement;
        $requirement->sort_order = 1000;
        $requirement->save();

        return response()->json([
            'status'=>200,
            'data'=> $requirement,
            'message'=>"Requirement added successfully."
        ],200);
    }
    // This method will update requirement
    public function update($id ,Request $request){

        $requirement = Requirement::find($id);

        if($requirement ==null){
            return response()->json([
            'status'=>404,
            'message'=>"Requirement not found."
        ],404);
        }
        $validator = Validator::make($request->all(),[
            'requirement'=>'required'
        ]);

        if($validator->fails()){
             return response()->json([
            'status'=>400,
            'errors'=>$validator->errors()
        ],400);
        }
        
       
        $requirement->text= $request->requirement;    
        $requirement->save();

        return response()->json([
            'status'=>200,
            'data'=> $requirement,
            'message'=>"Requirement updated successfully."
        ],200);
    }
    // this method will delete requirement
    public function destory($id){
        $requirement = Requirement::find($id);

        if($requirement ==null){
            return response()->json([
            'status'=>404,
            'message'=>"Requirement not found."
        ],404);
        }
        $requirement->delete();

        return response()->json([
            'status'=>200,
            'message'=>"Requirement deleted successfully."
        ],200);

    }

    // This method will sort requirements
    public function sortRequirements(Request $request){
        if(!empty($request->requirements)){
            foreach($request->requirements as $key =>$requirement){
                requirement::where('id',$requirement['id'])->update(['sort_order'=> $key]);
            }
        }
        return response()->json([
            'status'=>200,
            'message'=>"Order Updated successfully."
        ],200);
    }
}
