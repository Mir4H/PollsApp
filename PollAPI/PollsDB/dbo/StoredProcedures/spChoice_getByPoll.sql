CREATE PROCEDURE [dbo].[spChoice_getByPoll]
    @Id int
AS
begin
    SELECT [Choice_id], [Text], [Votes], [Poll_id] FROM dbo.[Choice] WHERE Poll_id = @Id;
end
