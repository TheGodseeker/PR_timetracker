using Microsoft.AspNetCore.Mvc;

using System;
using System.Globalization;
using System.Text.Json;

   namespace TController.Controllers
   {
        public class TasksController : Controller
        {

            /*
            TO-DO

            Методы, подключенные по DI возвращают только пустые строчки.
            Возможно, это связано со связью с БД, но это не точно.
            */

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

                // var result = JsonSerializer.Serialize(_context.tasks.ToList());

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

            [HttpPost]
            public void AddTask(string name, string desc = null, long expTime = 0)
            {
                    
                var tasksCount = _context.tasks.ToList().Count + 1;

                var newTask = new DBTask{
                            Id = tasksCount,
                            Name = name,
                            Desc = desc,
                            ExpTime = expTime,
                            SpentTime = 0,
                            IsDone = false
                            };

                _context.tasks.Add(newTask);
                _context.SaveChanges();

            }


            [HttpPut]
            public IActionResult CompleteTask(long taskID)
            {
                var curTask = _context.tasks.FirstOrDefault(item => item.Id == taskID);

                if (curTask == null)
                    return NoContent();

                curTask.IsDone = true;

                _context.SaveChanges();

                return Ok();

                        

            }

        }
   }
   