IF NOT EXISTS (SELECT 1 FROM dbo.[Poll])
begin
	INSERT INTO dbo.[Poll] (Title)
	VALUES ('Which of the following best describes how you feel?'),
	('How long have you been in working life?'),
	('If you were stranded on an island, what would you want the most?'),
	('What do you find scariest?'),
	('If you could play one instrument well, which would you pick?'),
	('Which extreme sport would you try first?'),
	('If you could time-travel, which period would you go to?');
end

IF NOT EXISTS (SELECT 1 FROM dbo.[Choice])
begin
	INSERT INTO dbo.[Choice] (Text, Votes, Poll_id)
	VALUES ('Happy', 0, 1),
	('Sad', 0, 1),
	('Relaxed', 0, 1),
	('Bored', 0, 1),
	('0-3 years', 0, 2),
	('3-10 years', 0, 2),
	('11-25 years', 0, 2),
	('More', 0, 2),
	('Food', 0, 3),
	('A tool kit', 0, 3),
	('SOS signal', 0, 3),
	('A Friend', 0, 3),
	('Heights', 0, 4),
	('Flying', 0, 4),
	('Small spaces', 0, 4),
	('Spiders', 0, 4),
	('Piano', 0, 5),
	('Guitar', 0, 5),
	('Drums', 0, 5),
	('Saxophone', 0, 5),
	('Other', 0, 5),
	('Sky diving', 0, 6),
	('Bungee jumping', 0, 6),
	('Scuba diving', 0, 6),
	('Free climbing', 0, 6),
	('The past', 0, 7),
	('The future', 0, 7),
	('I’m good where I am', 0, 7);
end
