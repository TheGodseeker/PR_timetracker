using Microsoft.AspNetCore.Mvc;

using System;
using System.Globalization;
using System.Text.Json;

   namespace TController.Controllers
   {
        public class TasksController : Controller
        {

            DBConnector context;

            public TasksController()
            {
                this.context = new DBConnector();
            }
            
            [HttpGet]
            public IActionResult GetAllTasks()
            {
                using var context = this.context;

                var result = JsonSerializer.Serialize(context.tasks.ToList());

                return Ok(result);
            }
                

            [HttpGet]
            public IActionResult GetDoneTasks()
            {
                using var context = this.context;

                var tasks = from task in context.tasks.ToList()
                            where task.isDone == true
                            select task;

                var result = JsonSerializer.Serialize(tasks);
                return Ok(result);
            }

            [HttpGet]
            public IActionResult GetUndoneTasks()
            {
                using var context = this.context;

                var tasks = from task in context.tasks.ToList()
                            where task.isDone == true
                            select task;
                
                var result = JsonSerializer.Serialize(tasks);

                return Ok(result);

            }

            [HttpPost]
            public void AddTask(string _name, string _desc = null, long exptTime = 0)
            {
                using var context = this.context;
                    
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


            [HttpPut]
            public IActionResult CompleteTask(long taskID)
            {
                using var context = this.context;
                    var curTask = context.tasks.FirstOrDefault(item => item.id == taskID);

                    if (curTask != null)
                    {
                        curTask.isDone = true;

                        context.SaveChanges();

                        return Ok();
                    }
                    else
                        return NoContent();

            }

        }
   }
   