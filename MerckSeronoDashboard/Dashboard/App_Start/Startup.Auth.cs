using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.Cookies;
using Owin;

namespace Dashboard
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie
            });
        }
    }
}