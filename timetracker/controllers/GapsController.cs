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

            /*
            TO-DO:
            Реализация вычисления затраченного времени
            2) Расчет внутри функции контроллера
            */

            [HttpPost] 
            public void AddTimeGap(long taskID, long userID = 1)
            {
                    var gapsCount = _context.timeGaps.ToList().Count + 1;

                    var newGap = new TimeGap{
                        Id = gapsCount,
                        IdTask = taskID,
                        IdUser = userID,
                        TimeStart = DateTime.UtcNow,
                        TimeFinish = null,
                        IsActive = true
                    };

                    _context.timeGaps.Add(newGap);
                    _context.SaveChanges();

            }



            // [HttpGet]
            // public IActionResult GetGapActivity(long gapId)
            // {
            //     using (var _context = new DBConnector()){

            //     }
            // }

            [HttpPut]
            public IActionResult UpdateEndTimeGap(long gapId, bool isAct = true)
            {
                    var curGap = _context.timeGaps.FirstOrDefault(item => item.Id == gapId);
                
                    if (curGap == null)
                        return NoContent();
                    
                    curGap.IsActive = isAct;   
                    var curDT = DateTime.UtcNow;

                    if(curGap.TimeFinish != null)
                        return NoContent();
                        
                    if (curGap.TimeFinish > curDT && curGap.TimeStart > curDT)
                    {
                        curGap.TimeFinish = curDT;
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
   