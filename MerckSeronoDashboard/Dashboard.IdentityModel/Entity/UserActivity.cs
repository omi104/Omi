using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dashboard.IdentityModel.Entity
{
    public  class UserActivity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserActivityId { get; set; }
        public string UserId { get; set; }
        public DateTime LoginTime { get; set; }
    }
}
