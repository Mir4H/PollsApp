CREATE PROCEDURE [dbo].[spChoice_Insert]
	@Text nvarchar(50),
	@Poll_id int
AS
begin
	INSERT INTO dbo.Choice(Text, Poll_id)
	VALUES (@Text, @Poll_id);
end