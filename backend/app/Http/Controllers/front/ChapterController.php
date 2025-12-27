<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChapterController extends Controller
{
     //This method will return all Chapter of a course
    public function index(Request $request){
        $chapters = Chapter::where('course_id',$request->course_id)->orderBy("sort_order")->get();

        return response()->json([
            'status'=>200,
            'data'=>$chapters
        ],200);
    }
    // This method will store/save a chapters
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'chapter'=>'required',
            'course_id'=>'required'
        ]);

        if($validator->fails()){
             return response()->json([
            'status'=>400,
            'errors'=>$validator->errors()
        ],400);
        }

        $chapter = new Chapter();
        $chapter->course_id = $request->course_id;
        $chapter->title= $request->chapter;
        $chapter->sort_order = 1000;
        $chapter->save();

        return response()->json([
            'status'=>200,
            'data'=> $chapter,
            'message'=>"chapter added successfully."
        ],200);
    }
    // This method will update chapters
    public function update($id ,Request $request){

        $chapter = Chapter::find($id);

        if($chapter ==null){
            return response()->json([
            'status'=>404,
            'message'=>"chapter not found."
        ],404);
        }
        $validator = Validator::make($request->all(),[
            'chapter'=>'required'
        ]);

        if($validator->fails()){
             return response()->json([
            'status'=>400,
            'errors'=>$validator->errors()
        ],400);
        }
        
       
        $chapter->title= $request->chapter;    
        $chapter->save();

        return response()->json([
            'status'=>200,
            'data'=> $chapter,
            'message'=>"chapter updated successfully."
        ],200);
    }
    // this method will delete chapter
    public function destory($id){
        $chapter = Chapter::find($id);

        if($chapter ==null){
            return response()->json([
            'status'=>404,
            'message'=>"chapter not found."
        ],404);
        }
        $chapter->delete();

        return response()->json([
            'status'=>200,
            'message'=>"chapter deleted successfully."
        ],200);

    }

    // This method will sort chapter
    public function sortChapters(Request $request){
        if(!empty($request->chapters)){
            foreach($request->chapter as $key =>$chapter){
                chapter::where('id',$chapter['id'])->update(['sort_order'=> $key]);
            }
        }
        return response()->json([
            'status'=>200,
            'message'=>"Order Updated successfully."
        ],200);
    }
}
