using System;
using System.Globalization;
using System.Text.Json;

public class GapsRep : IGaps
{
    private readonly DBConnector _context;

    public GapsRep(DBConnector dBConnector)
    {
        _context = dBConnector;
    }

    public IEnumerable<TimeGap> GetTimeGaps(long taskID)
    {
        var gaps = from gap in _context.timeGaps.ToList()
                   where gap.idTask == taskID
                   select gap;

        return gaps; 
    }
}