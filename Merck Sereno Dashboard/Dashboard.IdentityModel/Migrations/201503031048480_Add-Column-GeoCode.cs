namespace Dashboard.IdentityModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddColumnGeoCode : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "GeoCode", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "GeoCode");
        }
    }
}
