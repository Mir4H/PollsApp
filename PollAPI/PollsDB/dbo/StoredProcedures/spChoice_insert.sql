CREATE PROCEDURE [dbo].[spChoice_insert]
	@Text nvarchar(50),
	@Votes int,
	@Poll_id int
AS
begin
	INSERT INTO dbo.Choice(Text, Votes, Poll_id)
	VALUES (@Text, @Votes, @Poll_id);
end