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
    // modelBuilder.Entity<DBTask>()
    //     .HasKey(e => e.Id);

    // modelBuilder.Entity<TimeGap>()
    //     .HasKey(e => e.Id);


    // modelBuilder.Entity<DBTask>().ToTable("tasks");
    // modelBuilder.Entity<TimeGap>().ToTable("timeGaps");


    }

    // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    // {
    //     optionsBuilder.UseNpgsql("Host=127.0.0.1;Database=timetracker;Username=tengu;Password=root");
    // }

}