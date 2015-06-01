namespace Dashboard.ViewModels
{
    public class LoginViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
        public string ReTypedPassword { get; set; }
        public string RedirectUrl { get; set; }
        public bool RememberMe { get; set; }
        public string EncryptedPassword { get; set; }
        public bool IsPersistentLogin { get; set; }
    }
}