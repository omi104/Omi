//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using System.Web;
//using System.Web.Mvc;
//using System.Web.Security;
//using Dashboard.Controllers.Account;
//using Dashboard.Helper;
//using Dashboard.IdentityModel.Entity;
//using Dashboard.IdentityModel.Repositories;
//using Dashboard.Models.Data;
//using Dashboard.ViewModels;
//using Microsoft.AspNet.Identity;

//namespace Dashboard.Controllers
//{
//    [AllowAnonymous]
//    public class RegisterController : AccountBaseController
//    {
//        private readonly IAccountRepository _accountRepository;

//        public RegisterController()
//        {
//            _accountRepository = new AccountRepository();
//        }

//        public ActionResult Index()
//        {
//            return View();
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        public async Task<ActionResult> Index(UserViewModel model)
//        {
//            if (ModelState.IsValid)
//            {
//                var user = new ApplicationUser() { UserName = model.UserName, Email = model.Email, Role = "User", FirstName = model.UserName };
//                var result = await UserManager.CreateAsync(user, model.Password);
//                if (result.Succeeded)
//                {
//                    await SignInAsync(user, isPersistent: false);
//                    return RedirectToLocal(string.Empty);
//                }
//                AddErrors(result);
//            }
           
//            return View(model);
//        }

//        private void AddErrors(IdentityResult result)
//        {
//            foreach (var error in result.Errors)
//            {
//                ModelState.AddModelError("", error);
//            }
//        }

//        [AllowAnonymous]
//        public ActionResult ForgetPassowrd()
//        {
//            var returnUrl = Request["rb"];
//            var status = AutomaticLoginForgetPassword(returnUrl);
//            if (status)
//            {

//                return RedirectToAction("ChangePassword");
//            }
//            return Redirect("~/");
//        }

//        public ActionResult ChangePassword()
//        {
//            ViewData["UserId"] = User.Identity.Name;
//            return View();
//        }

//        private bool AutomaticLoginForgetPassword(string loginUrl)
//        {

//            var cryptographyHelper = new CryptographyHelper();
//            loginUrl = cryptographyHelper.Decrypt(loginUrl.Replace(" ", "+") + "=");

//            var domainUserName = loginUrl.Split("_^_".ToCharArray(), StringSplitOptions.None);
//            var userName = domainUserName[0];

//            var universalTime = DateTime.Now.ToUniversalTime();
//            var urlTime = Convert.ToDateTime(domainUserName[3]);

//            TimeSpan timeDiff = universalTime - urlTime;

//            if (timeDiff.TotalDays > 1)
//            {
//                Response.Redirect(FormsAuthentication.LoginUrl);
//            }
//            else
//            {
//                if (IsValidUserAutomaticLogin(userName))
//                {
//                    FormsAuthentication.SetAuthCookie(userName, false);
//                    return true;
//                }
//            }

//            return false;



//        }

//        private bool IsValidUserAutomaticLogin(string userName)
//        {
//            var user = _accountRepository.GetLoggedInUser(userName);
//            if (user != null)
//                return true;
//            return false;
//        }
//    }
//}
