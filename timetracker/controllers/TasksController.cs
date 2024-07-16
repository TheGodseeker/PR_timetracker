using Microsoft.AspNetCore.Mvc;

using System;
using System.Globalization;
using System.Text.Json;

   namespace TController.Controllers
   {
        public class TasksController : Controller
        {
            private readonly ITask _taskRep;
            private readonly DBConnector _context; 
            

            public TasksController(ITask taskRep, DBConnector context)
            {
                _context = context;
                _taskRep = taskRep;
            }
            
            [HttpGet]
            public IActionResult GetAllTasks()
            {
                var result = _taskRep.GetAllTasks();

                return Ok(result);
            }
                

            [HttpGet]
            public IActionResult GetDoneTasks()
            {
                var result = JsonSerializer.Serialize(_taskRep.GetTasks(true));
                return Ok(result);
            }

            [HttpGet]
            public IActionResult GetUndoneTasks()
            {
                
                var result = JsonSerializer.Serialize(_taskRep.GetTasks(false));

                return Ok(result);

            }

            [HttpGet]
            public IActionResult GetTask(long taskID)
            {
                var curTask = _context.tasks.FirstOrDefault(item => item.id == taskID);

                var result = JsonSerializer.Serialize(curTask);

                return Ok(result);         

            }            

            [HttpPost]
            public void AddTask(string n, string d = null, long et = 0)
            {
                    
                var tasksCount = _context.tasks.ToList().Count + 1;

                var newTask = new DBTask{
                            id = tasksCount,
                            name = n,
                            desc = d,
                            expTime = et,
                            spentTime = 0,
                            isDone = false
                            };

                _context.tasks.Add(newTask);
                _context.SaveChanges();

            }


            [HttpPut]
            public IActionResult CompleteTask(long taskID)
            {
                var curTask = _context.tasks.FirstOrDefault(item => item.id == taskID);

                if (curTask == null)
                    return NoContent();

                curTask.isDone = true;

                _context.SaveChanges();

                return Ok();

                        

            }

        }
   }
   