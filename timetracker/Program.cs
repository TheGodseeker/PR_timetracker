using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => 
   options.AddPolicy("AllowMain", builder => builder
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
    )
);

builder.Services.AddDbContext<DBConnector>(
    options => options.UseNpgsql("Host=127.0.0.1;Database=timetracker;Username=tengu;Password=root")
);

builder.Services.AddScoped<ITask, TaskRep>();
builder.Services.AddScoped<IGaps, GapsRep>();

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowMain");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


var webSocketOptions = new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromSeconds(5)
};

app.UseWebSockets(webSocketOptions);

app.Run();


