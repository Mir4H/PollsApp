CREATE PROCEDURE [dbo].[spChoice_Update]
	@Id int,
	@Votes int
AS
begin
	UPDATE dbo.[Choice] SET Votes = @Votes OUTPUT inserted.Poll_id WHERE Choice_id = @Id;
end
