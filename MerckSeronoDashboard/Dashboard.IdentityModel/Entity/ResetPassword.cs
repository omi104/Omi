using System;
using System.ComponentModel.DataAnnotations;

namespace Dashboard.IdentityModel.Entity
{
    public class ResetPassword
    {
        [Key]
        [StringLength(100)]
        public string User { get; set; }
        public string Hash { get; set; }
        public DateTime GenerateTime { get; set; }
        public string ReturnUrl { get; set; }
    }
}
