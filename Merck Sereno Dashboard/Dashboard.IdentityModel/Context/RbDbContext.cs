using System.Configuration;
using System.Data.Entity;
using Dashboard.IdentityModel.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Dashboard.IdentityModel.Context
{
    public class RbDbContext : IdentityDbContext<ApplicationUser>
    {
        public RbDbContext()
            : base(GetDbConnectionString())
        {
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<EmailTemplate> EmailsTemplates { get; set; }
        public DbSet<Favourite> Favourites { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<IdentityUser>().ToTable("Users");
            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            modelBuilder.Entity<IdentityUserRole>().ToTable("UserRoles");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("UserLogins");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("UserClaims");
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");
            modelBuilder.Entity<Favourite>().ToTable("Favourites");
            modelBuilder.Entity<UserActivity>().ToTable("UserActivities");
            modelBuilder.Entity<EmailTemplate>().ToTable("EmailTemplates");
        }

        private static string GetDbConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["CONTENT"].ToString();
        }

    }
}
