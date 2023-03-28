CREATE PROCEDURE [dbo].[spChoice_Update]
	@Id int,
	@Votes int
AS
begin
	UPDATE dbo.[Choice] SET Votes = @Votes WHERE Choice_id = @Id;
end
