using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace PollAPI
{
    public static class Api
    {
        public static void ConfigureApi(this WebApplication app)
        {
            app.MapGet("/Polls", GetPolls);
            app.MapGet("/Polls/{id}", GetPoll);
            app.MapPost("/Polls", InsertPoll);
            app.MapPost("/Choices", InsertChoice);
            app.MapPut("/Polls/{id}/vote/{id2}", UpdateChoice);
            app.MapDelete("/Polls/{id}", DeletePoll);
        }

        private static async Task<IResult> GetPolls(IPollData data)
        {
            try
            {
                var results = await data.GetPolls();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> GetPoll(int id, IPollData data)
        {
            try
            {
                var results = await data.GetPoll(id);
                if (results == null) return Results.NotFound();
                return Results.Ok(results);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> InsertPoll(PollModel poll, IEnumerable<ChoiceModel> votes, IPollData data)
        {
            try
            {
                var id = await data.InsertPoll(poll);

                return Results.Ok(id);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> InsertChoice(ChoiceModel choice, IPollData data)
        {
            try
            {
                await data.InsertChoice(choice);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> UpdateChoice(int id, int id2, ChoiceModel choice, IPollData data)
        {
            try
            {
                await data.UpdateChoice(id2, choice);
                var result = await data.GetPoll(id);
                return Results.Ok(result);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }

        }

        private static async Task<IResult> DeletePoll(int id, IPollData data)
        {
            try
            {
                await data.DeletePoll(id);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
    }
}
