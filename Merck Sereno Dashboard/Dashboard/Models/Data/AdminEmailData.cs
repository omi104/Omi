using System.Collections.Generic;
using Component.Node;
using Dashboard.IdentityModel.Entity;

namespace Dashboard.Models.Data
{
    public class AdminEmailData
    {

        public List<INode> ButtonNodes { get; set; }

        public EmailTemplate EmailTemplate { get; set; }

        public AdminEmailData()
        {
            ButtonNodes = new List<INode>();
            EmailTemplate = new EmailTemplate();
        }
    }
}