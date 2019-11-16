<?php

namespace App\Http\Controllers;

use App\EnvironmentBuilder;
use App\Http\Requests\LessonCreationRequest;
use App\Lesson;
use App\Path;
use App\Utils\FileUtils;
use Auth;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class LessonsController extends Controller
{

    public function index(Request $request)
    {
        return Controller::narrowDownFromConditions(
            $request->all(),
            "\App\Lesson"
        );
    }

    public function create(): Renderable
    {
        $lesson = new Lesson();
        return view("lesson_create", [
            "lesson" => $lesson,
            "user" => Auth::user(),
        ]);
    }

    public function store(LessonCreationRequest $request)
    {
        //
        $environmentBuilder = new EnvironmentBuilder("promark", "centos:7");
        $environmentBuilder->mysql("5.7.28", "promarkuser", "promarkpassword", "3306");
        $environmentBuilder->laravel("5.7");
        $environmentBuilder->write(storage_path("Dockerfile"));
        //
        $parameters = $request->all();
        $parameters["book"] = "";
        $lesson = Lesson::create($parameters);
        $lessonDirectoryPath = Path::lesson("$lesson->id");
        mkdir($lessonDirectoryPath);
        FileUtils::copy(Path::dockerDevelopment(), $lessonDirectoryPath);
        $originalPath = Path::lessonOriginals(Path::append("Laravel", "5.8"));
        $hostAppDirectoryPath = Path::append($lessonDirectoryPath, "app");
        mkdir($hostAppDirectoryPath);
        FileUtils::copy($originalPath, $hostAppDirectoryPath);
        $optionsDirectoryPath = Path::append($lessonDirectoryPath, "options");
        mkdir($optionsDirectoryPath);
        $containerAppDirectoryPath = "/opt/app";
        $containerLogsDirectoryPath = "/etc/ProMark/logs";
        $dataDirectoryPath = Path::append($lessonDirectoryPath, "data");
        $hostLogsDirectoryPath = Path::append($lessonDirectoryPath, "logs");
        File::put(
            Path::append($lessonDirectoryPath, ".env"),
            "HOST_DATA_DIRECTORY_PATH=$dataDirectoryPath\nHOST_APP_DIRECTORY_PATH=$hostAppDirectoryPath\nHOST_LOGS_DIRECTORY_PATH=$hostLogsDirectoryPath\nCONTAINER_APP_DIRECTORY_PATH=$containerAppDirectoryPath\nCONTAINER_LOGS_DIRECTORY_PATH=$containerLogsDirectoryPath"
        );
        exec("cd $lessonDirectoryPath && docker-compose build");
        $lesson->host_app_directory_path = $hostAppDirectoryPath;
        $lesson->host_logs_directory_path = $hostLogsDirectoryPath;
        $lesson->container_app_directory_path = $containerAppDirectoryPath;
        $lesson->container_logs_directory_path = $containerLogsDirectoryPath;
        $lesson->lesson_directory_path = $lessonDirectoryPath;
        $lesson->options_directory_path = $optionsDirectoryPath;
        $lesson->data_directory_path = $dataDirectoryPath;
        $lesson->save();
        return redirect("/development/creating/{$lesson->id}");
    }

    public function update(Request $request, int $id)
    {
        $parameters = $request->all();
        if ($request->has("book") && is_null($request->book)) {
            $parameters["book"] = "";
        }
        Lesson::find($id)->fill($parameters)->save();
    }

    // public function delta(int $id)
    // {
    //     $lesson = Lesson::find($id);
    //     $logPath = Path::append($lesson->host_logs_directory_path, "app_changes.txt");
    //     //$logPath = "$lesson->host_logs_directory_path/app_changes.txt";
    //     $appChanges = File::get($logPath, true);
    //     File::put($logPath, "");
    //     $pattern = "/(\\/opt\\/app\\/.*?) (CREATE|DELETE|MODIFY)(,ISDIR)? (.*)/u";
    //     preg_match_all($pattern, $appChanges, $matches);
    //     return $matches;
    // }
}
