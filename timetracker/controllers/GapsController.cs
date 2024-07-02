using Microsoft.AspNetCore.Mvc;

using System;
using System.Globalization;
using System.Text.Json;

   namespace GController.Controllers
   {
        public class GapsController : Controller
        {
            private readonly IGaps _gapsRep;
            private readonly DBConnector _context;

            public GapsController(IGaps gapsRep, DBConnector context)
            {
                _context = context;
                _gapsRep = gapsRep; 
            }

            // Запросы для таблицы "timeGaps"
            [HttpGet]
            public IActionResult GetTimeGaps(long taskID)
            {                    
                var result = JsonSerializer.Serialize(_gapsRep.GetTimeGaps(taskID));
                return Ok(result);
            }

            [HttpPut] 
            public void AddTimeGap(long taskID, long userID = 1)
            {
                    var gapsCount = _context.timeGaps.ToList().Count + 1;

                    var newGap = new TimeGap{
                        id = gapsCount,
                        idTask = taskID,
                        idUser = userID,
                        timeStart = DateTime.UtcNow,
                        timeFinish = null,
                        isActive = true
                    };

                    _context.timeGaps.Add(newGap);
                    _context.SaveChanges();

            }


            /*
            TO-DO

            Почему-то функция записывает разность от 0 старта (?),
            что приводит к отриц. значению потрач. времени в БД
            */
            [HttpPut]
            public IActionResult SetTimeGapEnd(long taskID, long userID = 1, bool activeState = false)
            {
                var curGap = _context.timeGaps.FirstOrDefault(item => 
                    (item.idTask == taskID) &&  (item.idUser == userID) && (item.isActive)
                );

                if(curGap == null)
                    return NoContent();

                var curDT = DateTime.UtcNow;
                curGap.timeFinish = curDT;
                curGap.isActive = activeState;


                TimeSpan workTime = new TimeSpan();
                // Добавляем разницу между UTC и ВЛ временем
                // var workTime = ((DateTime) curGap.timeFinish).AddHours(10) - curGap.timeStart;

                // Console.WriteLine($"Разница во времени: {workTime}");

                var taskGaps = _gapsRep.GetTimeGaps(taskID);

                foreach (var gap in taskGaps)
                {

                    if (gap.isActive)
                        workTime += ((DateTime) gap.timeFinish).AddHours(10) - gap.timeStart;
                    else                      
                        workTime += ((DateTime) gap.timeFinish) - gap.timeStart;
                           
                }

                var curTask = _context.tasks.FirstOrDefault(item => item.id == taskID);
                // curTask.spentTime += Convert.ToInt64(workTime.TotalMilliseconds);
                curTask.spentTime = Convert.ToInt64(workTime.TotalMilliseconds);

                _context.SaveChanges();

                return Ok();
            }

            [HttpPut]
            public IActionResult UpdateEndTimeGap(long gapId, bool isAct = true)
            {
                    var curGap = _context.timeGaps.FirstOrDefault(item => item.id == gapId);
                
                    if (curGap == null)
                        return NoContent();
                    
                    curGap.isActive = isAct;   
                    var curDT = DateTime.UtcNow;

                    if(curGap.timeFinish != null)
                        return NoContent();
                        
                    if (curGap.timeFinish > curDT && curGap.timeStart > curDT)
                    {
                        curGap.timeFinish = curDT;
                        Console.WriteLine(curDT);
                        _context.SaveChanges();
                        
                        return Ok();
                    }
                    else
                    {
                        return NoContent();
                    }      
                        
            }

        }
   }
   