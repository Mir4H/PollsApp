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
            var choices = await _db.LoadData<ChoiceModel, dynamic>(
               "dbo.spChoice_getByPoll",
               new { Id = id });

            foreach (var result in results)
            {
                result.Choices = choices.Where(a => a.Poll_id == result.Poll_id).ToList();
            }

            return results.FirstOrDefault();
        }

        public async Task<int> InsertPoll(PollModel poll)
        {
            var result = await _db.GetId("dbo.spPoll_Insert", new { poll.Title });
            return result;
        }

        public Task InsertChoice(ChoiceModel choice) =>
            _db.SaveData("dbo.spChoice_Insert", new { choice.Text, choice.Poll_id });

        public Task UpdateChoice(int id, ChoiceModel choice) =>
            _db.SaveData("dbo.spChoice_Update", new { id, choice.Votes });

        public Task DeletePoll(int id) =>
            _db.SaveData("dbo.spPoll_Delete", new { Id = id });
    }
}
