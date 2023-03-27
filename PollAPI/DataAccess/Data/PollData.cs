using DataAccess.DbAccess;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Data
{
    public class PollData : IPollData
    {
        private readonly ISqlDataAccess _db;

        public PollData(ISqlDataAccess db)
        {
            _db = db;
        }

        public Task<IEnumerable<PollModel>> GetPolls() =>
            _db.LoadData<PollModel, dynamic>("dbo.spPoll_GetAll", new { });

        public async Task<PollModel?> GetPoll(int id)
        {
            var results = await _db.LoadData<PollModel, dynamic>(
                "dbo.spPoll_Get",
                new { Id = id });
            return results.FirstOrDefault();
        }

        public Task<int> InsertPoll(PollModel poll)
        {
            var results = _db.GetId("dbo.spPoll_Insert", new { poll.Title });
            return results;
        }

        public async Task<List<ChoiceModel>> GetChoices(int id)
        {
            var results = await _db.LoadData<ChoiceModel, dynamic>(
                "dbo.spChoice_getByPoll",
                new { Id = id });
            return results.ToList();
        }

        public Task InsertChoice(ChoiceModel choice) =>
             _db.SaveData("dbo.spChoice_Insert", new { choice.Text, choice.Votes, choice.Poll_id });

        public Task UpdateChoice(ChoiceModel choice) =>
            _db.SaveData("dbo.spChoice_update", new { Id = choice.Choice_id, choice.Votes });
    }
}
