   using Microsoft.AspNetCore.Mvc;

   using System.Text.Json;

   namespace TTController.Controllers
   {
        public class TimeTracker : Controller
        {
            //Запросы для таблицы "tasks"
            //TO-DO: сделать конвертацию времени из милисек. в норм. формат
            [HttpGet]
            public IActionResult GetAllTasks()
            {
                using (var context = new DBConnector()){

                    string result = JsonSerializer.Serialize(context.tasks.ToList());

                    return Ok(result);
                }
                
            }

            [HttpGet]
            public IActionResult GetDoneTasks()
            {
                using (var context = new DBConnector()){
                    List<Task> tasks = new List<Task>();
                    foreach(var task in context.tasks.ToList()){
                        if (task.isDone)
                            tasks.Add(task);
                    }
                    string result = JsonSerializer.Serialize(tasks);

                    return Ok(result);
                }
            }

            [HttpGet]
            public IActionResult GetUndoneTasks()
            {
                using (var context = new DBConnector()){
                    List<Task> tasks = new List<Task>();
                    foreach(var task in context.tasks.ToList()){
                        if (!task.isDone)
                            tasks.Add(task);
                    }
                    string result = JsonSerializer.Serialize(tasks);

                    return Ok(result);
                }
            }

            [HttpPost]
            public void AddTask(string _name, string _desc = null, long exptTime = 0)
            {
                using (var context = new DBConnector()){
                    
                    var tasksCount = context.tasks.ToList().Count + 1;

                    var newTask = new Task{
                        id = tasksCount,
                        name = _name,
                        desc = _desc,
                        expTime = exptTime,
                        spentTime = 0,
                        isDone = false
                    };

                    context.tasks.Add(newTask);
                    context.SaveChanges();

                }
            }

            [HttpPut]
            public void CompleteTask(long taskID)
            {
                using (var context = new DBConnector()){
                    var curTask = context.tasks.FirstOrDefault(item => item.id == taskID);

                    if (curTask != null)
                    {
                        curTask.isDone = true;

                        context.SaveChanges();
                    }

                }
            }

            // Запросы для таблицы "timeGaps"
            [HttpGet]
            public IActionResult GetTimeGaps(long taskID)
            {
                using (var context = new DBConnector()){
                    List<TimeGap> gaps = new List<TimeGap>(); 

                    Console.WriteLine($"TaskID = {taskID}");

                    foreach (var gap in context.timeGaps.ToList())
                    {
                        Console.WriteLine(gap.idTask);
                        if(gap.idTask == taskID)
                            gaps.Add(gap);

                    }                 
                    
                    string result = JsonSerializer.Serialize(gaps);
                    Console.WriteLine(result);


                    return Ok(result);
                }
            }
        }
   }
   