using System.ComponentModel.DataAnnotations;

namespace Dashboard.IdentityModel.Entity
{
    public class SendEmail
    {
        [Key]
        [MaxLength(50)]
        public string UserId { get; set; }

        public string SendEmailTo { get; set; }

        public string SendEmailSubject { get; set; }

        public string SendEmailComment { get; set; }
    }
}
