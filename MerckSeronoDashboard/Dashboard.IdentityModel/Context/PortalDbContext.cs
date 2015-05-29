// ©2013 IMS Software Services Ltd., All Rights Reserved.  IMS Software Services Confidential and Proprietary.

using System.Configuration;
using System.Data.Entity;
using Dashboard.IdentityModel.Entity;

namespace Dashboard.IdentityModel.Context
{
    public class PortalDbContext : DbContext
    {
        public DbSet<LatestDataAvailability> LatestDataAvailability { get; set; }

        public PortalDbContext()
            : base(GetDbConnectionString())
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        private static string GetDbConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["CONTENT"].ToString();
        }

        
    }
}
