CREATE PROCEDURE [dbo].[spPoll_Insert]
	@Title nvarchar(50)
AS
begin
	INSERT INTO dbo.[Poll] (Title)
	OUTPUT inserted.[Poll_id]
	VALUES (@Title)
end

