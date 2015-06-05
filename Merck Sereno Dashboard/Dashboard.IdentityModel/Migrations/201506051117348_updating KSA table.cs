namespace Dashboard.IdentityModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatingKSAtable : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.KSAPassword");
            AddColumn("dbo.KSAPassword", "KSA_UserId", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.KSAPassword", "KSA_Password", c => c.String());
            AddPrimaryKey("dbo.KSAPassword", "KSA_UserId");
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.KSAPassword");
            AlterColumn("dbo.KSAPassword", "KSA_Password", c => c.String(nullable: false, maxLength: 128));
            DropColumn("dbo.KSAPassword", "KSA_UserId");
            AddPrimaryKey("dbo.KSAPassword", "KSA_Password");
        }
    }
}
