using System;
using System.Configuration;
using System.IO;
using System.Threading.Tasks;
using System.Web.Mvc;
using Dashboard.DataComponents.Helper;
using Dashboard.IdentityModel.Entity;
using Dashboard.IdentityModel.Repositories;
using Dashboard.Models.Data;
using Microsoft.AspNet.Identity;

namespace Dashboard.Controllers.Account
{
    public class ForgotPasswordController : AccountBaseController
    {
        private readonly IUserAdminRepository _userAdminRepository;
        public ForgotPasswordController()
        {
            _userAdminRepository = new UserAdminRepository();
        }

        //[HttpPost]
        [AllowAnonymous]
        public string Index(string userName, bool isReset = false)
        {
            var message = string.Empty;
            if (string.IsNullOrEmpty(userName))
                return "Username can not be empty";
            var user = _userAdminRepository.GetActiveUser(userName);
            if (user.UserName == null)
                return "Username does not exist.";
            if (!EMail.IsEmail(user.Email))
            {
                message = "User does not have a valid mail address.";
            }
            else
            {
                string url = default(string);
                TextReader privateKey = new StreamReader(Server.MapPath("~/App_Data/BIPrivateKey.xml"));
                TextReader publicKey = new StreamReader(Server.MapPath("~/App_Data/IMSPublicKey.xml"));
                var encryption = new Encryption();
                var encryptedText = encryption.Encrypt(privateKey.ReadToEnd(), publicKey.ReadToEnd(), user.UserName + "_^_" + DateTime.Now.ToUniversalTime());
                var path = Request.IsLocal ? "" : "/";
                url = Request.Url.GetLeftPart(UriPartial.Authority) + Request.ApplicationPath + path + "ForgotPassword/ValidateMail?parameters=" + encryptedText;
                SendForgotPasswordMail(user, url);
                message = "Updated";
                if (isReset)
                    message = "Password reset successfully";
            }
            return message;
        }

        protected void SendForgotPasswordMail(ApplicationUser user, string url)
        {
            var sendFrom = ConfigurationManager.AppSettings["ForgotPasswordMailFrom"];
            var sendTo = user.Email;
            var subject = ConfigurationManager.AppSettings["ForgotPasswordMailSubject"];
            var body = ConfigurationManager.AppSettings["ForgotPasswordMailBody"];
            body = body.Replace("$first_name$", user.FirstName);
            body = body.Replace("$last_name$", user.LastName);
            body = body.Replace("$URL$", url);
            body = body.Replace("$user_id$", user.UserName);
            body = body.Replace("$systemAdmin_mailId$", ConfigurationManager.AppSettings["systemAdminMailId"]);
            EMail.SendMail(sendFrom, sendTo, subject, body);
        }

        [AllowAnonymous]
        public async Task<ActionResult> ValidateMail(string parameters)
        {
            try
            {
                TextReader privateKeyFromFile = new StreamReader(Server.MapPath("~/App_Data/IMSPrivateKey.xml"));
                TextReader publicKeyFromFile = new StreamReader(Server.MapPath("~/App_Data/BIPublicKey.xml"));
                var forgotPasswordGetInfo=new ForgotPasswordGetInfo();
                var infoFromParemeter = forgotPasswordGetInfo.GetInfoFromParameter(parameters,privateKeyFromFile,publicKeyFromFile);
                var universalTime = DateTime.Now.ToUniversalTime();
                var timeDiff = universalTime - infoFromParemeter.Item2;
                if (timeDiff.TotalDays > 1)
                {
                    TempData["ValidationMessage"] = "Please, Regenerate the Forgot Password Email.";
                    return RedirectToLogin();
                }

                if (await IsValidUserAutomaticLogin(infoFromParemeter.Item1))
                {
                    Session["username"] = infoFromParemeter.Item1;
                    return RedirectToAction("RedirectToNewPassword");
                }
            }
            catch (Exception ex)
            {
                IMS.Logger.Logger.Fatal(ex.Message, ex);
            }

            return RedirectToLogin();
        }


        [AllowAnonymous]
        protected ActionResult RedirectToLogin()
        {
            return RedirectToAction("Index", "Login");
        }

        private async Task<bool> IsValidUserAutomaticLogin(string userName)
        {
            var result = false;
            var user = UserManager.FindByName(userName);

            if (user != null)
            {
                await SignInAsync(user, false);
                result = true;
            }
            return result;
        }

        [AllowAnonymous]
        public ActionResult RedirectToNewPassword()
        {
            var viewModel = new NewPasswordViewModel()
                {
                    UserName = (string)Session["username"]
                };

            return View("NewPassword", viewModel);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult RedirectToNewPassword(NewPasswordViewModel model)
        {
            model.UserName = (string) Session["username"];
            return SetPassword(model, "NewPassword");
        }

        private ActionResult SetPassword(NewPasswordViewModel model, string viewName)
        {
            if (string.IsNullOrEmpty(model.NewPassword))
            {
                ModelState.AddModelError("", "Please enter new password.");
                return View(viewName, model);
            }
            if (string.IsNullOrEmpty(model.ConfirmPassword))
            {
                ModelState.AddModelError("", "Please confirm the password.");
                return View(viewName, model);
            }
            if (!IsSamePassword(model.NewPassword, model.ConfirmPassword))
            {
                ModelState.AddModelError("", "Retyped password not matched");
                return View(viewName, model);
            }
            if (IsDefaultPassword(model))
            {
                ModelState.AddModelError("", "Please provide other than the default password.");
                return View(viewName, model);
            }
            if (model.NewPassword.Length < 6)
            {
                ModelState.AddModelError("", "Password length must be at least 6.");
                return View(viewName, model);
            }
            var user = UserManager.FindByName(model.UserName);
            if (user != null)
            {
                user.PasswordHash = UserManager.PasswordHasher.HashPassword(model.NewPassword);
                IdentityResult result = UserManager.Update(user);
                if (result.Succeeded)
                {
                    return RedirectToLocal(string.Empty);
                }

            }
            return RedirectToLogin();
        }

        public bool IsDefaultPassword(NewPasswordViewModel model)
        {
            return model.NewPassword == "123456";
        }

        private bool IsSamePassword(string newPass, string reTypedPass)
        {
            return newPass.Equals(reTypedPass);
        }
    }
}
