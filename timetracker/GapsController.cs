using Microsoft.AspNetCore.Mvc;

using System;
using System.Globalization;
using System.Text.Json;

   namespace GController.Controllers
   {
        public class GapsController : Controller
        {
            DBConnector context;

            public GapsController()
            {
                this.context = new DBConnector();
            }

            // Запросы для таблицы "timeGaps"
            [HttpGet]
            public IActionResult GetTimeGaps(long taskID)
            {
                using var context = this.context;
                
                var gaps = from gap in context.timeGaps.ToList()
                           where gap.idTask == taskID
                           select gap;                 
                
                var result = JsonSerializer.Serialize(gaps);
                return Ok(result);
            }

            /*
            TO-DO:
            Реализация вычисления затраченного времени
            2) Расчет внутри функции контроллера
            */

            [HttpPost] 
            public void AddTimeGap(long taskID, long userID = 1)
            {
                using var context = this.context;
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



            // [HttpGet]
            // public IActionResult GetGapActivity(long gapId)
            // {
            //     using (var context = new DBConnector()){

            //     }
            // }

            [HttpPut]
            public IActionResult UpdateEndTimeGap(long gapId, bool isAct = true)
            {
                using var context = this.context;
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

                                return Ok();
                            }
                            else
                                return NoContent();                                        
                        }
                        else
                            return NoContent();
                    }
                    else
                        return NoContent();
            }

        }
   }
   