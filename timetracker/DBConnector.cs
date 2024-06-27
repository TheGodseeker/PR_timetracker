//контекст для БД

using Microsoft.EntityFrameworkCore;

public class DBConnector : DbContext 
{ 

    public DbSet<DBTask> tasks { get; set; }
    public DbSet<TimeGap> timeGaps { get; set; }

    public DBConnector(DbContextOptions<DBConnector> options): base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }

}