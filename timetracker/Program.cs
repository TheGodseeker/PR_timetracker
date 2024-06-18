var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => 
   options.AddPolicy("AllowMain", builder => builder
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
    )
);

// builder.Services.AddAuthentication();
// builder.Services.AddAuthorization();
// builder.Services.ConfigureIdentity();

var app = builder.Build();

// app.UseHttpsRedirection();

// app.UseRouting();

// app.UseCors(builder => builder.AllowAnyOrigin());


app.UseCors("AllowMain");

app.MapGet("/api/tasks", () =>
{
     using (var context = new DBConnector())
            {
                return Results.Json(context.tasks.ToList());
            }
});

// app.UseAuthorization();

// app.MapControllers();

// app.Run(async(context) => 
// {
//     context.Response.ContentType = "text/html; charset=utf-8";
//     await context.Response.SendFileAsync("../timetrackerUI/index.html");
// });

app.Run();


