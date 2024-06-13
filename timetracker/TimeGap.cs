// модель для таблицы TimeGaps

public class TimeGap 
{
    public long id { get; set; }
    public long idTask { get; set; }
    public long idUser { get; set; }

    // TO-DO: нужно написать конвертер даты в str и обратно
    public string timeStart { get; set; }
    public string timeFinish { get; set; }
}