﻿CREATE TABLE [dbo].[Choice]
(
	[Choice_id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Text] NVARCHAR(50) NOT NULL, 
    [Votes] INT NOT NULL DEFAULT 0, 
    [Poll_id] INT FOREIGN KEY(Poll_id) REFERENCES Poll(Poll_id) ON DELETE CASCADE NULL
)