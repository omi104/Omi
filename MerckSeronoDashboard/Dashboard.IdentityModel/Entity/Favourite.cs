using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dashboard.IdentityModel.Entity
{
    public class Favourite
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [StringLength(200)]
        public string NavName { get; set; }
        [StringLength(100)]
        public string UserId { get; set; }
        [StringLength(500)]
        public string Title { get; set; }
        [StringLength(500)]
        public string Image { get; set; }
        [StringLength(800)]
        public string OnClick { get; set; }
        public string Params { get; set; }
        public int SortOrder { get; set; }
        public bool IsCompany { get; set; }
        public bool IsFixed { get; set; }
        [StringLength(50)]
        public string Cluster { get; set; }
    }
}
