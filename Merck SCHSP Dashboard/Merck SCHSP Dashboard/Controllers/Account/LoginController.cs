using System;
using System.Configuration;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Merck_SCHSP_Dashboard.ViewModels;

namespace Merck_SCHSP_Dashboard.Controllers.Account
{
    public class LoginController : AccountBaseController
    {

        [AllowAnonymous]
        public ActionResult Index(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }


        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Index(LoginViewModel model, string returnUrl)
        {
            if (string.IsNullOrEmpty(model.UserName))
                ModelState.AddModelError("", "Please enter username.");
            if (string.IsNullOrEmpty(model.Password))
                ModelState.AddModelError("", "Please enter password.");
            if (ModelState.IsValid)
            {
                HttpContext.Response.SetCookie(new HttpCookie(model.UserName) { Value = model.UserName, Expires = DateTime.Now.AddDays(365) });
                FormsAuthentication.SetAuthCookie(model.UserName, model.RememberMe);
                return RedirectToLocal(returnUrl);
                //var user = await UserManager.FindAsync(model.UserName, model.Password);
                //if (user != null)
                //{
                //    if (IsDefaultPassword(model))
                //    {
                //        model.RedirectUrl = returnUrl;
                //        TempData["user"] = model;
                //        return RedirectToAction("ResetDefaultPassword");
                //    }
                //    await SignInAsync(user, model.RememberMe);
                //    AddUserActivity(model.UserName);
                //    return RedirectToLocal(returnUrl);
                //}
                //model.RedirectUrl = returnUrl;
                //ModelState.AddModelError("", "Invalid username or password.");
            }
            return View(model);
        }

        //public ActionResult LogOut()
        //{
        //    AuthenticationManager.SignOut();
        //    Session.Clear();
        //    return RedirectToAction("Index");
        //}

        //[HttpPost]
        //public int AddUserActivity(string userName)
        //{
        //    try
        //    {
        //        using (var ctx = new RbDbContext())
        //        {
        //            var userActivity = new UserActivity()
        //            {

        //                UserId = userName,
        //                LoginTime = DateTime.Now
        //            };
        //            ctx.UserActivities.Add(userActivity);
        //            ctx.SaveChanges();
        //        }
        //        return 1;
        //    }
        //    catch (Exception ex)
        //    {

        //        IMS.Logger.Logger.Fatal(ex.Message, ex);
        //        return 0;
        //    }
        //}

        ////public ActionResult LogOut()
        ////{
        ////    FormsAuthentication.SignOut();
        ////    return RedirectToAction("Index");
        ////}

        //[AllowAnonymous]
        //public ActionResult ResetDefaultPassword()
        //{
        //    var model = TempData["user"];
        //    return View("ResetPassword", model);
        //}



        //[HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public ActionResult ResetDefaultPassword(LoginViewModel model)
        //{
        //    return SetPassword(model, "ResetPassword");
        //}

        //private ActionResult SetPassword(LoginViewModel model, string viewName)
        //{
        //    if (string.IsNullOrEmpty(model.NewPassword))
        //    {
        //        ModelState.AddModelError("", "Please enter new password.");
        //        return View(viewName, model);
        //    }
        //    if (string.IsNullOrEmpty(model.ReTypedPassword))
        //    {
        //        ModelState.AddModelError("", "Please retype the password.");
        //        return View(viewName, model);
        //    }
        //    if (!IsSamePassword(model.NewPassword, model.ReTypedPassword))
        //    {
        //        ModelState.AddModelError("", "Retyped password not matched");
        //        return View(viewName, model);
        //    }
        //    if (model.NewPassword.Length < 3)
        //    {
        //        ModelState.AddModelError("", "Password length must be at least 3.");
        //        return View(viewName, model);
        //    }
        //    var user = UserManager.FindByName(model.UserName);
        //    if (user != null)
        //    {
        //        user.PasswordHash = UserManager.PasswordHasher.HashPassword(model.NewPassword);
        //        IdentityResult result = UserManager.Update(user);
        //        if (result.Succeeded)
        //        {
        //            SendResetPasswordMail(user, model.NewPassword);
        //            return RedirectToLocal(model.RedirectUrl);
        //        }

        //    }
        //    return View(viewName, model);
        //}

        //private void SendResetPasswordMail(ApplicationUser user, string newPassword)
        //{
        //    string sendFrom = ConfigurationManager.AppSettings["PasswordResetMailFrom"];
        //    string sendTo = user.Email;
        //    string subject = ConfigurationManager.AppSettings["PasswordResetMailSubject"];
        //    subject = subject.Replace("$project_name$", "Reckitt Benckiser Dashboard");

        //    string body = ConfigurationManager.AppSettings["PasswordResetMailBody"];
        //    body = body.Replace("$first_name$", user.FirstName);
        //    body = body.Replace("$last_name$", user.LastName);
        //    body = body.Replace("$PASSWORD$", newPassword);
        //    body = body.Replace("$user_id$", user.UserName);
        //    body = body.Replace("$systemAdmin_mailId$", ConfigurationManager.AppSettings["systemAdminMailId"]);

        //    EMail.SendMail(sendFrom, sendTo, subject, body);
        //}


        //public bool IsDefaultPassword(LoginViewModel model)
        //{
        //    return model.Password == "123";
        //}

        //private bool IsSamePassword(string newPass, string reTypedPass)
        //{
        //    return newPass.Equals(reTypedPass);
        //}
    }
}
