//контекст для БД

using Microsoft.EntityFrameworkCore;

public class DBConnector : DbContext 
{ 

    public DbSet<Task> tasks { get; set; }
    public DbSet<TimeGap> timeGaps { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=127.0.0.1;Database=timetracker;Username=tengu;Password=root");
    }

}