namespace DataAccess.DbAccess
{
    public interface ISqlDataAccess
    {
        Task<int> GetId<T>(string storedProcedure, T parameters, string connectionId = "Default");
        Task<IEnumerable<T>> LoadData<T, U>(string storedProcedure, U parameters, string connectionId = "Default");
        Task SaveData<T>(string storedProcedure, T parameters, string connectionId = "Default");
    }
}