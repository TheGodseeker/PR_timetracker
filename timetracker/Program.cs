var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => 
   options.AddPolicy("AllowMain", builder => builder
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
    )
);

builder.Services.AddControllers();
// builder.Services.AddAuthentication();
// builder.Services.AddAuthorization();
// builder.Services.ConfigureIdentity();

var app = builder.Build();

app.UseCors("AllowMain");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


app.Run();


