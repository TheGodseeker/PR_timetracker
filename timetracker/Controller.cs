   using Microsoft.AspNetCore.Mvc;
   using System.Text.Json;

   namespace TTController.Controllers
   {
        // [Route("api/[controller]")]
        // [ApiController]
        public class TimeTracker : Controller
        {
            //TO-DO: сделать упаковку данных в json-формат
            [HttpGet]
            public IActionResult GetAllTasks()
            {
                using (var context = new DBConnector()){
                    // foreach(var task in context.tasks.ToList()){

                    // }
                    string result = JsonSerializer.Serialize(context.tasks.ToList());

                    return Ok(result);
                }
                
            }
        }
   }
   