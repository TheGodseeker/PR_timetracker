using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// модель для таблицы Tasks

public class DBTask 
{


    public long id { get; set; }

    public long expTime { get; set; }
    
    public long spentTime { get; set; }

    public string name { get; set; }
    
    public string? desc { get; set; }

    public bool isDone { get; set; }
}