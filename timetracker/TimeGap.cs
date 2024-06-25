using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// модель для таблицы TimeGaps


public class TimeGap 
{
    public long id { get; set; }

    public long idTask { get; set; }

    public long idUser { get; set; }

    public DateTime timeStart { get; set; }
    
    public DateTime? timeFinish { get; set; }

    public bool isActive {get; set;}
}