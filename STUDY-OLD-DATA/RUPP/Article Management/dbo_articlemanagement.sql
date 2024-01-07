/*
Navicat SQL Server Data Transfer

Source Server         : SQLServer
Source Server Version : 110000
Source Host           : :1433
Source Database       : art_mngmnt
Source Schema         : dbo

Target Server Type    : SQL Server
Target Server Version : 110000
File Encoding         : 65001

Date: 2017-02-08 11:45:12
*/



-- ----------------------------
-- Table structure for ArtUser
-- ----------------------------
DROP TABLE [dbo].[ArtUser]
GO
CREATE TABLE [dbo].[ArtUser] (
[id] smallint NOT NULL IDENTITY(1,1) ,
[name] nvarchar(30) NOT NULL ,
[email] nvarchar(30) NOT NULL ,
[firstname] nvarchar(30) NOT NULL ,
[lastname] nvarchar(30) NOT NULL ,
[gender] nvarchar(1) NOT NULL ,
[passwd] nvarchar(MAX) NULL ,
[role_id] smallint NOT NULL 
)


GO

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE [dbo].[category]
GO
CREATE TABLE [dbo].[category] (
[id] smallint NOT NULL IDENTITY(1,1) ,
[name] varchar(30) NOT NULL ,
[description] varchar(50) NULL 
)


GO

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE [dbo].[menu]
GO
CREATE TABLE [dbo].[menu] (
[id] smallint NOT NULL IDENTITY(1,1) ,
[title] varchar(30) NOT NULL ,
[parent_id] smallint NULL ,
[user_id] smallint NOT NULL ,
[page_id] smallint NOT NULL 
)


GO

-- ----------------------------
-- Table structure for page
-- ----------------------------
DROP TABLE [dbo].[page]
GO
CREATE TABLE [dbo].[page] (
[id] smallint NOT NULL IDENTITY(1,1) ,
[url] varchar(1) NOT NULL ,
[title] varchar(50) NOT NULL DEFAULT ('untitled') ,
[contents] varchar(MAX) NOT NULL ,
[user_id] smallint NOT NULL ,
[created_date] date NOT NULL DEFAULT (getdate()) 
)


GO

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE [dbo].[post]
GO
CREATE TABLE [dbo].[post] (
[id] smallint NOT NULL IDENTITY(1,1) ,
[title] varchar(50) NOT NULL DEFAULT ('untitled') ,
[texts] varchar(MAX) NOT NULL ,
[image] varchar(MAX) NULL ,
[post_date] date NOT NULL DEFAULT (getdate()) ,
[author] varchar(30) NOT NULL DEFAULT ('unknown') ,
[category_id] smallint NOT NULL ,
[user_id] smallint NULL 
)


GO


-- ----------------------------
-- Table structure for UserRole
-- ----------------------------
DROP TABLE [dbo].[UserRole]
GO
CREATE TABLE [dbo].[UserRole] (
[id] smallint NOT NULL IDENTITY(1,1) ,
[name] nvarchar(30) NOT NULL ,
[description] nvarchar(MAX) NULL 
)


GO



-- ----------------------------
-- Indexes structure for table ArtUser
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table ArtUser
-- ----------------------------
ALTER TABLE [dbo].[ArtUser] ADD PRIMARY KEY ([id])
GO

-- ----------------------------
-- Uniques structure for table ArtUser
-- ----------------------------
ALTER TABLE [dbo].[ArtUser] ADD UNIQUE ([name] ASC)
GO
ALTER TABLE [dbo].[ArtUser] ADD UNIQUE ([email] ASC)
GO

-- ----------------------------
-- Indexes structure for table category
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table category
-- ----------------------------
ALTER TABLE [dbo].[category] ADD PRIMARY KEY ([id])
GO

-- ----------------------------
-- Uniques structure for table category
-- ----------------------------
ALTER TABLE [dbo].[category] ADD UNIQUE ([name] ASC)
GO

-- ----------------------------
-- Indexes structure for table menu
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table menu
-- ----------------------------
ALTER TABLE [dbo].[menu] ADD PRIMARY KEY ([id])
GO

-- ----------------------------
-- Uniques structure for table menu
-- ----------------------------
ALTER TABLE [dbo].[menu] ADD UNIQUE ([title] ASC)
GO

-- ----------------------------
-- Indexes structure for table page
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table page
-- ----------------------------
ALTER TABLE [dbo].[page] ADD PRIMARY KEY ([id])
GO

-- ----------------------------
-- Uniques structure for table page
-- ----------------------------
ALTER TABLE [dbo].[page] ADD UNIQUE ([url] ASC)
GO

-- ----------------------------
-- Indexes structure for table post
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table post
-- ----------------------------
ALTER TABLE [dbo].[post] ADD PRIMARY KEY ([id])
GO


-- ----------------------------
-- Indexes structure for table UserRole
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table UserRole
-- ----------------------------
ALTER TABLE [dbo].[UserRole] ADD PRIMARY KEY ([id])
GO

-- ----------------------------
-- Uniques structure for table UserRole
-- ----------------------------
ALTER TABLE [dbo].[UserRole] ADD UNIQUE ([name] ASC)
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[ArtUser]
-- ----------------------------
ALTER TABLE [dbo].[ArtUser] ADD FOREIGN KEY ([role_id]) REFERENCES [dbo].[UserRole] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[menu]
-- ----------------------------
ALTER TABLE [dbo].[menu] ADD FOREIGN KEY ([page_id]) REFERENCES [dbo].[page] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[menu] ADD FOREIGN KEY ([parent_id]) REFERENCES [dbo].[menu] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[menu] ADD FOREIGN KEY ([user_id]) REFERENCES [dbo].[ArtUser] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[page]
-- ----------------------------
ALTER TABLE [dbo].[page] ADD FOREIGN KEY ([user_id]) REFERENCES [dbo].[ArtUser] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[post]
-- ----------------------------
ALTER TABLE [dbo].[post] ADD FOREIGN KEY ([category_id]) REFERENCES [dbo].[category] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[post] ADD FOREIGN KEY ([user_id]) REFERENCES [dbo].[ArtUser] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
