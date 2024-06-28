using System;
using System.Globalization;
using System.Text.Json;

public class TaskRep : ITask
{
    private readonly DBConnector _context;

    public TaskRep(DBConnector dBConnector)
    {
        _context = dBConnector;
    }
    
    public IEnumerable<DBTask> GetTasks(bool done)
    {
        var tasks = from task in _context.tasks.ToList()
                    where task.isDone == done 
                    select task;

        return tasks;

    }
    public string GetAllTasks()
    {
        return JsonSerializer.Serialize(_context.tasks.ToList());
    }
}