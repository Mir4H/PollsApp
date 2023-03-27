using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IPollData
    {
        Task<List<ChoiceModel>> GetChoices(int id);
        Task<PollModel?> GetPoll(int id);
        Task<IEnumerable<PollModel>> GetPolls();
        Task InsertChoice(ChoiceModel choice);
        Task<int> InsertPoll(PollModel poll);
        Task UpdateChoice(ChoiceModel choice);
    }
}