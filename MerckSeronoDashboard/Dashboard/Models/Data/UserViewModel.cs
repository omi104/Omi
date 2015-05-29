using System;

namespace Dashboard.Models.Data
{
    [Serializable]
    public class UserViewModel
    {
        public string UserName { get; set; }
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Email { set; get; }        
        public string Role { get; set; }
        public bool IsActive { get; set; }
        public bool ReceiveEmailAlert { get; set; }
        public string Action { get; set; }
        public string GeoCode { get; set; }
        public string Org { get; set; }
        public string Position { get; set; }
    }
}