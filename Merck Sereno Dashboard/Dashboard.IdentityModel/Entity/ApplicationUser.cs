using Microsoft.AspNet.Identity.EntityFramework;

namespace Dashboard.IdentityModel.Entity
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { set; get; }

        public string LastName { set; get; }

        public string Position { get; set; }

        public string Role { get; set; }

        public bool IsActive { get; set; }

        public string GeoCode { get; set; }

        public string Org { get; set; }

        public bool ReceiveEmailAlert { get; set; }

        public ApplicationUser()
        {
            IsActive = true;
        }
    }
}