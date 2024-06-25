public interface IGaps
{
    public IEnumerable<TimeGap> GetTimeGaps(long taskID);
}