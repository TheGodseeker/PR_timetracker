using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// модель для таблицы Tasks

public class DBTask 
{

    [Column("id", TypeName="bigint")]
    public long Id { get; set; }

    [Column("expTime", TypeName="bigint")]
    public long ExpTime { get; set; }
    
    [Column("spentTime", TypeName="bigint")]
    public long SpentTime { get; set; }

    [Column("name", TypeName="character(50)")]
    public string Name { get; set; }
    
    [Column("desc", TypeName="text")]
    public string? Desc { get; set; }

    [Column("isDone", TypeName="boolean")]
    public bool IsDone { get; set; }
}