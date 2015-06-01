namespace Dashboard.IdentityModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateFavourite : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Favourites",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        NavName = c.String(maxLength: 200),
                        UserId = c.String(maxLength: 100),
                        Title = c.String(maxLength: 500),
                        Image = c.String(maxLength: 500),
                        OnClick = c.String(maxLength: 800),
                        Params = c.String(),
                        SortOrder = c.Int(nullable: false),
                        IsCompany = c.Boolean(nullable: false),
                        IsFixed = c.Boolean(nullable: false),
                        Cluster = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            DropTable("dbo.Favorites");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Favorites",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Url = c.String(),
                        UserId = c.String(),
                        Name = c.String(),
                        NavigationName = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            DropTable("dbo.Favourites");
        }
    }
}
