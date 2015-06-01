using System.ComponentModel.DataAnnotations;

namespace Dashboard.ViewModels
{
    public class NewPasswordViewModel
    {
        public string UserName { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}