using System.ComponentModel.DataAnnotations;

namespace Dashboard.IdentityModel.Entity
{
    public class KSAPassword
    {
        [Key]
        public string KSA_UserId { set; get; }
        public string KSA_Password { set; get; }
    }
}
