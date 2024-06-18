using System;
using System.Linq;

class Program
{

    static void Main(string[] args)
    {

        
        using (var context = new DBConnector())
        {

            if (context.Database.CanConnect())
            {
                
                // Тест приема кодом задач из БД
                var curTasks = GetAllTasks();
                Console.WriteLine("Все задачи:");
                foreach(var task in curTasks)
                {
                    Console.WriteLine($"id: {task.id}, name: {task.name}, desc: {task.desc}, expTime: {task.expTime}, spentTime: {task.spentTime}, isDone: {task.isDone}");
                }
            }
            else
                Console.WriteLine("Нет связи с базой данных.");
            
        }
    }

    static List<Task> GetAllTasks()
    {
        using (var context = new DBConnector())
        {
            return context.tasks.ToList();

        }
    }
}
