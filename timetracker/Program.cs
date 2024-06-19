var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => 
   options.AddPolicy("AllowMain", builder => builder
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
    )
);

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowMain");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


app.Run();


