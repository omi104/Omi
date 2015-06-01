namespace Dashboard.IdentityModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddColumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Position", c => c.String());
            AddColumn("dbo.Users", "Org", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "Org");
            DropColumn("dbo.Users", "Position");
        }
    }
}
