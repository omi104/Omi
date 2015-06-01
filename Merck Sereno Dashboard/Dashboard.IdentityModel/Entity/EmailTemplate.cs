using System.ComponentModel.DataAnnotations;

namespace Dashboard.IdentityModel.Entity
{
    public class EmailTemplate
    {
        [Key]
        public int TemplateId { get; set; }

        public string Name { set; get; }

        public string Subject { set; get; }

        public string Content { set; get; }

    }
}
