using System;
using System.Collections.Generic;
using System.Linq;
using Dashboard.Configurations.Constant;
using Dashboard.IdentityModel.Context;
using Dashboard.IdentityModel.Entity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Dashboard.IdentityModel.Repositories
{
    public class UserAdminRepository : IUserAdminRepository
    {
        protected UserManager<ApplicationUser> UserManager =
            new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new RbDbContext()));

        public List<ApplicationUser> GetActiveUsers()
        {
            using (var ctx = new RbDbContext())
            {
                return ctx.Users.ToList();
            }
        }

        public ApplicationUser GetActiveUser(string userId)
        {
            try
            {
                using (var ctx = new RbDbContext())
                {
                    return ctx.Users.FirstOrDefault(p => p.UserName.ToLower() == userId.ToLower());
                }
            }
            catch (InvalidOperationException exception)
            {
                IMS.Logger.Logger.Fatal(exception.Message,exception);
                return new ApplicationUser()
                {
                    Email = "exception@bd.imshealth.com",
                    FirstName = "Exception",
                    LastName = "User",
                    UserName = "undefined"
                };
            }
        }

        public ApplicationUser GetUserByEmail(string email)
        {
            using (var ctx = new RbDbContext())
            {
                return ctx.Users.Where(p => p.Email.ToLower() == email.ToLower()).FirstOrDefault();
            }
        }


        public string AddUser(string id, ApplicationUser applicationUser)
        {
            try
            {
                var result = UserManager.Create(applicationUser, "123456");
                if (result.Succeeded)
                {
                    UserManager.CreateIdentityAsync(applicationUser, DefaultAuthenticationTypes.ApplicationCookie);
                }

                return Constant.UserAdmin.Result.Insereted;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        public string EditUser(string id, ApplicationUser applicationUser)
        {
            try
            {
                var ctx = new RbDbContext();
                var user = ctx.Users.FirstOrDefault(u => u.UserName.ToLower() == applicationUser.UserName.ToLower());
                if (user != null)
                {
                    user.FirstName = applicationUser.FirstName;
                    user.LastName = applicationUser.LastName;
                    user.Position = applicationUser.Position;
                    user.Email = applicationUser.Email;
                    user.Role = applicationUser.Role;
                    user.GeoCode = applicationUser.GeoCode;
                    user.Org = applicationUser.Org;
                    user.ReceiveEmailAlert = applicationUser.ReceiveEmailAlert;
                }
                ctx.SaveChanges();
                return Constant.UserAdmin.Result.Updated;
            }
            catch (Exception ex)
            {
                IMS.Logger.Logger.Fatal(ex.Message, ex);
                return "failed";
            }

        }

        public string RemoveUser(string id)
        {
            try
            {
                var ctx = new RbDbContext();
                var user = ctx.Users.FirstOrDefault(u => u.UserName.ToLower() == id.ToLower());
                ctx.Users.Remove(user);
                ctx.SaveChanges();
                return "Removed successfully";
            }
            catch (Exception ex)
            {
                IMS.Logger.Logger.Fatal(ex.Message, ex);
                return ex.Message;
            }
        }

        public string ResetPassword(string userId, string encryptedPassword)
        {
            var message = string.Empty;
            var newPassword = "ims123";

            var user = GetActiveUser(userId);
            user.PasswordHash = UserManager.PasswordHasher.HashPassword(newPassword);

            message = "Password is reset to " + newPassword;
            return message;
        }

        public string ChangePassword(string userId, string oldPassword, string newPassword)
        {
            try
            {
                var user = GetActiveUser(userId);

                if (user.PasswordHash == UserManager.PasswordHasher.HashPassword(oldPassword))
                {
                    user.PasswordHash = UserManager.PasswordHasher.HashPassword(newPassword);
                    IdentityResult result = UserManager.Update(user);
                    if (result.Succeeded)
                    {
                        return "password changed";
                    }
                }
                return "old password does not match";
            }
            catch (Exception ex)
            {

                IMS.Logger.Logger.Fatal(ex.Message, ex);
                return ex.Message;
            }

        }

    }
}
