using Microsoft.AspNetCore.Mvc;

using System;
using System.Globalization;
using System.Text.Json;

   namespace GController.Controllers
   {
        public class GapsController : Controller
        {

            // Запросы для таблицы "timeGaps"
            [HttpGet]
            public IActionResult GetTimeGaps(long taskID)
            {
                using (var context = new DBConnector()){
                    List<TimeGap> gaps = new List<TimeGap>(); 

                    // Console.WriteLine($"TaskID = {taskID}");

                    foreach (var gap in context.timeGaps.ToList())
                    {
                        // Console.WriteLine(gap.idTask);
                        if(gap.idTask == taskID)
                            gaps.Add(gap);

                    }                 
                    
                    string result = JsonSerializer.Serialize(gaps);
                    // Console.WriteLine(result);


                    return Ok(result);
                }
            }

            /*
            TO-DO:
            Реализация вычисления затраченного времени
            2) Расчет внутри функции контроллера
            */

            [HttpPost] 
            public void AddTimeGap(long taskID, long userID = 1)
            {
                using (var context = new DBConnector()){
                    var gapsCount = context.timeGaps.ToList().Count + 1;

                    var newGap = new TimeGap{
                        id = gapsCount,
                        idTask = taskID,
                        idUser = userID,
                        timeStart = DateTime.UtcNow,
                        timeFinish = null,
                        isActive = true
                    };

                    context.timeGaps.Add(newGap);
                    context.SaveChanges();

                }
            }



            // [HttpGet]
            // public IActionResult GetGapActivity(long gapId)
            // {
            //     using (var context = new DBConnector()){

            //     }
            // }

            [HttpPut]
            public void UpdateEndTimeGap(long gapId, bool isAct = true)
            {
                using (var context = new DBConnector()){
                    var curGap = context.timeGaps.FirstOrDefault(item => item.id == gapId);
                
                    if (curGap != null)
                    {
                        curGap.isActive = isAct;
                        
                        var curDT = DateTime.UtcNow;
                        if(curGap.timeFinish != null)
                        {
                            if (curGap.timeFinish > curDT && curGap.timeStart > curDT)
                            {
                                curGap.timeFinish = curDT;
                                context.SaveChanges();
                            }
                                
                        }
                    }
                }
            }

        }
   }
   