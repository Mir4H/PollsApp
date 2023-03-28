CREATE PROCEDURE [dbo].[spPoll_Delete]
	@Id int
AS
begin
	DELETE FROM dbo.[Poll]
	WHERE Poll_id = @Id
end