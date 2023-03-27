CREATE PROCEDURE [dbo].[spPoll_Get]
	@Id int
AS
begin
	SELECT [Poll_id], [Title], [Created_at] FROM dbo.[Poll] WHERE Poll_id=@Id;
end
