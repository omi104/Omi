using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Dashboard.IdentityModel.Context;
using Dashboard.IdentityModel.Entity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;

namespace Dashboard.Controllers.Account
{
    public abstract class AccountBaseController : Controller
    {
        protected UserManager<ApplicationUser> UserManager { get; private set; }

        protected IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }


        protected AccountBaseController()
            : this(new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new RbDbContext())))
        {

        }

        protected AccountBaseController(UserManager<ApplicationUser> userManager)
        {
            UserManager = userManager;
        }


        protected virtual async Task SignInAsync(ApplicationUser user, bool isPersistent)
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
            var identity = await UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = isPersistent }, identity);
        }

        protected virtual ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Dashboard", new { area = "" });
        }
    }
}
