CREATE PROCEDURE [dbo].[spPoll_GetAll]
AS
begin
	SELECT [Poll_id], [Title], [Created_at] FROM dbo.[Poll]
	ORDER BY Created_at DESC;
end
