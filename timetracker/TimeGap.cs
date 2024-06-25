using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// модель для таблицы TimeGaps

public class TimeGap 
{
    [Column("id", TypeName="bigint")]
    public long Id { get; set; }

    [Column("idTask", TypeName="bigint") ]
    public long IdTask { get; set; }

    [Column("idUser", TypeName="bigint")]
    public long IdUser { get; set; }

    [Column("timeStart", TypeName="timestamp without time zone")]
    public DateTime TimeStart { get; set; }
    
    [Column("timeFinish", TypeName="timestamp without time zone")]
    public DateTime? TimeFinish { get; set; }

    [Column("isActive", TypeName="boolean")]
    public bool IsActive {get; set;}
}