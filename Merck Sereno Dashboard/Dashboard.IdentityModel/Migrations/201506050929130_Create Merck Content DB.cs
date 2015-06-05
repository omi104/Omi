namespace Dashboard.IdentityModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateMerckContentDB : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.KSAPassword",
                c => new
                    {
                        KSA_Password = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.KSA_Password);
            
            DropTable("dbo.EmailTemplates");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.EmailTemplates",
                c => new
                    {
                        TemplateId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Subject = c.String(),
                        Content = c.String(),
                    })
                .PrimaryKey(t => t.TemplateId);
            
            DropTable("dbo.KSAPassword");
        }
    }
}
