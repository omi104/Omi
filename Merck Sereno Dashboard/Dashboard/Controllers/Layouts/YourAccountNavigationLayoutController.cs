using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Dashboard.IdentityModel.Context;
using Dashboard.IdentityModel.Entity;
using Dashboard.IdentityModel.Repositories;
using Dashboard.ViewModels;
using DashboardFramework.Web.Controllers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;

namespace Dashboard.Controllers.Layouts
{
    public class YourAccountNavigationLayoutController : LayoutBaseController<object>
    {

        private readonly UserManager<ApplicationUser> _userManager;

        public YourAccountNavigationLayoutController()
        {
            _userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new RbDbContext()));
        }

        public override ViewResult Index()
        {
            return View();
        }

        public string ChangePassword(NewPasswordViewModel model)
        {
            if (string.IsNullOrEmpty(model.NewPassword))
                return "Please enter new password.";
            if (string.IsNullOrEmpty(model.ConfirmPassword))
                return "Please confirm the password.";
            if (!IsSamePassword(model.NewPassword, model.ConfirmPassword))
                return "Retyped password not matched";
            if (IsDefaultPassword(model))
                return "Please provide other than the default password.";
            if (model.NewPassword.Length < 6)
                return "Password length must be at least 6.";
            var user = _userManager.FindByName(model.UserName);
            if (user != null)
            {
                var verificationResult = _userManager.PasswordHasher.VerifyHashedPassword(user.PasswordHash, model.CurrentPassword);
                if (verificationResult != PasswordVerificationResult.Success)
                    return "Please enter a valid current password";
                var result = _userManager.ChangePassword(user.Id, model.CurrentPassword, model.NewPassword);
                if (result.Succeeded)
                    return "Password changed successfully";
            }
            return "Change password attempt failed";
        }

        private bool IsSamePassword(string newPass, string reTypedPass)
        {
            return newPass.Equals(reTypedPass);
        }
        public bool IsDefaultPassword(NewPasswordViewModel model)
        {
            return model.NewPassword == "123456";
        }

    }
}
