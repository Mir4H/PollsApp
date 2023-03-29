using DataAccess.Models;
using System.Threading.Tasks;

namespace DataAccess.Data
{
    public interface IPollData
    {
        Task<PollModel?> GetPoll(int id);
        Task<IEnumerable<PollModel>> GetPolls();
        Task InsertChoice(ChoiceModel choice);
        Task<int> InsertPoll(PollModel poll);
        Task<int> UpdateChoice(ChoiceModel choice);
        Task DeletePoll(int id);
    }
}