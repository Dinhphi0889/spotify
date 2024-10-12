-- CreateTable
CREATE TABLE `Discuss` (
    `userId` INTEGER NULL,
    `discussId` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NULL,
    `songId` INTEGER NULL,
    `discussDate` DATETIME(0) NULL,
    `replayDiscussId` TEXT NULL,

    INDEX `songId`(`songId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`discussId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Following` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `followingId` INTEGER NULL,

    INDEX `followingUserId`(`followingId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `genreId` INTEGER NOT NULL AUTO_INCREMENT,
    `nameGenre` VARCHAR(255) NULL,
    `createTime` DATETIME(0) NULL,

    PRIMARY KEY (`genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LikedSong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idSongLiked` INTEGER NULL,
    `userId` INTEGER NULL,
    `liked` BOOLEAN NULL,

    INDEX `idUser`(`userId`),
    INDEX `idSongLiked`(`idSongLiked`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ListFriends` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `friendId` INTEGER NULL,
    `roomChat` VARCHAR(50) NULL,

    INDEX `idUser`(`userId`),
    INDEX `friendId`(`friendId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `idMess` INTEGER NOT NULL AUTO_INCREMENT,
    `idSender` INTEGER NULL,
    `contentMess` TEXT NULL,
    `timeSend` DATETIME(0) NULL,
    `roomChat` VARCHAR(100) NULL,

    INDEX `idUser`(`idSender`),
    PRIMARY KEY (`idMess`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecentSong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `songId` INTEGER NULL,
    `time` DATETIME(0) NULL,

    INDEX `userId`(`userId`),
    INDEX `songId`(`songId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Song` (
    `songId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `genreId` INTEGER NULL,
    `songName` VARCHAR(255) NOT NULL,
    `viewer` INTEGER NULL DEFAULT 0,
    `duration` TEXT NULL,
    `popular` BOOLEAN NULL,
    `description` TEXT NULL,
    `songImage` VARCHAR(255) NULL,
    `publicDate` DATE NULL,
    `filePath` VARCHAR(255) NULL,
    `discussQuality` INTEGER NULL,

    INDEX `genreId`(`genreId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`songId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `account` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NULL,
    `nationality` VARCHAR(255) NULL,
    `chanalName` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NULL,
    `desciption` TEXT NULL,
    `refreshToken` VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `banner` VARCHAR(255) NULL,
    `role` VARCHAR(50) NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Playlists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `imagePath` VARCHAR(255) NULL,
    `playlistName` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `createDate` DATETIME(0) NULL,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaylistSongs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playlistId` INTEGER NULL,
    `songId` INTEGER NULL,

    INDEX `playlistId`(`playlistId`),
    INDEX `songId`(`songId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Discuss` ADD CONSTRAINT `Discuss_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Discuss` ADD CONSTRAINT `Discuss_ibfk_2` FOREIGN KEY (`songId`) REFERENCES `Song`(`songId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Following` ADD CONSTRAINT `Following_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Following` ADD CONSTRAINT `Following_ibfk_2` FOREIGN KEY (`followingId`) REFERENCES `User`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `LikedSong` ADD CONSTRAINT `LikedSong_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `LikedSong` ADD CONSTRAINT `LikedSong_ibfk_2` FOREIGN KEY (`idSongLiked`) REFERENCES `Song`(`songId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ListFriends` ADD CONSTRAINT `ListFriends_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ListFriends` ADD CONSTRAINT `ListFriends_ibfk_3` FOREIGN KEY (`friendId`) REFERENCES `User`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_ibfk_2` FOREIGN KEY (`idSender`) REFERENCES `User`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `RecentSong` ADD CONSTRAINT `RecentSong_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `RecentSong` ADD CONSTRAINT `RecentSong_ibfk_2` FOREIGN KEY (`songId`) REFERENCES `Song`(`songId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_ibfk_2` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`genreId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Playlists` ADD CONSTRAINT `Playlists_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PlaylistSongs` ADD CONSTRAINT `PlaylistSongs_ibfk_1` FOREIGN KEY (`playlistId`) REFERENCES `Playlists`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PlaylistSongs` ADD CONSTRAINT `PlaylistSongs_ibfk_2` FOREIGN KEY (`songId`) REFERENCES `Song`(`songId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
