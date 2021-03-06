USE [bamazon]
GO
/****** Object:  Table [dbo].[products]    Script Date: 10/19/2018 5:14:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[products](
	[item_id] [int] IDENTITY(1,1) NOT NULL,
	[product_name] [varchar](100) NULL,
	[department_name] [varchar](100) NULL,
	[price] [decimal](20, 2) NULL,
	[stock_quantity] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[item_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[products] ON 

INSERT [dbo].[products] ([item_id], [product_name], [department_name], [price], [stock_quantity]) VALUES (1, N'tv', N'electronics', CAST(100.99 AS Decimal(20, 2)), 100)
INSERT [dbo].[products] ([item_id], [product_name], [department_name], [price], [stock_quantity]) VALUES (2, N'desk', N'furniture', CAST(500.99 AS Decimal(20, 2)), 50)
INSERT [dbo].[products] ([item_id], [product_name], [department_name], [price], [stock_quantity]) VALUES (3, N'rug', N'furniture', CAST(50.19 AS Decimal(20, 2)), 500)
INSERT [dbo].[products] ([item_id], [product_name], [department_name], [price], [stock_quantity]) VALUES (4, N'cup', N'home', CAST(5.59 AS Decimal(20, 2)), 500)
INSERT [dbo].[products] ([item_id], [product_name], [department_name], [price], [stock_quantity]) VALUES (5, N'keyboard', N'electronics', CAST(85.59 AS Decimal(20, 2)), 550)
SET IDENTITY_INSERT [dbo].[products] OFF
