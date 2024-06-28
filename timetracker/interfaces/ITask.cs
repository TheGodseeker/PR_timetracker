public interface ITask
{
    public IEnumerable<DBTask> GetTasks(bool isDone);
    public string GetAllTasks();
}