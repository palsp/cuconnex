
 SELECT 
 `Team`.`name`, 

 `member`.`id` AS `memberId`, 
 
 `memberRecommend`.`recommenderId` AS `recommenderId`, 

 `memberRecommend`.`score` AS `memberScore`, 
 
 `owner`.`id` AS `ownerId`,
 
 `ownerRecommend`.`score` AS `ownerScore` 
 
 FROM `teams` AS `Team` 
 LEFT OUTER JOIN (
	( `isMembers` 
		INNER JOIN 
		`users` AS `member`
		ON `member`.`id` = ``.`userId`) 
	INNER JOIN 
    (`recommendations` AS `memberRecommend`
		INNER JOIN 
        `users` AS `member->recommendation`
        ON `member->recommendation`.`id` = `memberRecommend`.`recommenderId`
        ) ON `member`.`id` = `memberRecommend`.`userId` AND `member->recommendation`.`id` = '6131776321' ) 
        
ON `Team`.`name` = `isMembers`.`teamName` 

    
LEFT OUTER JOIN ( 
	`users` AS `owner` INNER JOIN ( 
		`recommendations` AS `ownerRecommend` 
		INNER JOIN 
        `users` AS `owner->recommendation` 
        ON `owner->recommendation`.`id` = `ownerRecommend`.`recommenderId`	
	) ON `owner`.`id` = `ownerRecommend`.`userId` AND `owner->recommendation`.`id` = '6131776321' ) 
ON `Team`.`creatorId` = `owner`.`id` 



WHERE `Team`.`name` = 'test_team_0';