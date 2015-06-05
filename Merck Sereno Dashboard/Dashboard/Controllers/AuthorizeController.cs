using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dashboard.IdentityModel.Context;

namespace Dashboard.Controllers
{
    public class AuthorizeController : Controller
    {
        //
        // GET: /KSAAuthorize/

        public string AuthorizeKsaNavigation(string userId, string password)
        {
            string KSA_pass = GetKSAPassword();
            if (password.Equals(KSA_pass))
                return "Success";
            return "Failed";
        }
        public string GetKSAPassword()
        {
            using (var ctx = new RbDbContext())
            {
                var item = ctx.KSAPasswords.ToList().First();
                return item.GetType().GetProperty("KSA_Password").GetValue(item, null).ToString();
            }
        }
    }
}
