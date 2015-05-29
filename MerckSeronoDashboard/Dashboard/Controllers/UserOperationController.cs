using System;
using System.Configuration;
using System.IO;
using System.Web.Mvc;
using System.Web.Security;
using Dashboard.Configurations.Constant;
using Dashboard.DataComponents.Helper;
using Dashboard.Helper;
using Dashboard.IdentityModel.Context;
using Dashboard.IdentityModel.Entity;
using Dashboard.IdentityModel.Repositories;
using Dashboard.Models.Data;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Dashboard.Controllers
{
    public class UserOperationController : Controller
    {
        private readonly IUserAdminRepository _userAdminRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        public UserOperationController()
        {
            _userAdminRepository = new UserAdminRepository();
            _userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new RbDbContext()));
        }       
        public string Update(UserViewModel model)
        {            
            var user = new ApplicationUser
                {
                    UserName = model.UserName.ToLower(),
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    Role = model.Role,
                    Position = model.Position,
                    Org = model.Org,
                    GeoCode = model.GeoCode,
                    ReceiveEmailAlert = model.ReceiveEmailAlert
                };
            string message = string.Empty;  
            if (model.Action == Constant.UserAdmin.Operation.Add)
            {
                var storedUser = _userAdminRepository.GetActiveUser(user.UserName);
                if (storedUser != null && string.IsNullOrEmpty(storedUser.UserName))
                {
                    return "An user already exist with the same Username ('" + user.UserName + "').";
                }
                storedUser = _userAdminRepository.GetUserByEmail(user.Email);
                if (storedUser != null && string.IsNullOrEmpty(storedUser.UserName))
                {
                    return "An user already exist with the same Email ('" + user.Email + "').";
                }
                var encryptedPassword = user.PasswordHash = _userManager.PasswordHasher.HashPassword("123456");
                user.PasswordHash = encryptedPassword;
                message = _userAdminRepository.AddUser("", user);
                SendUserAddedMail(user, Request.Url.AbsoluteUri.Replace("UserOperation/Update", string.Empty));
            }
            else if (model.Action == Constant.UserAdmin.Operation.Edit)
            {
                var storedUser = _userAdminRepository.GetActiveUser(user.UserName);
                if (storedUser == null)
                    return user.UserName + " User Does Not Exist";
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Role = model.Role;
                user.Position = model.Position;
                user.GeoCode = model.GeoCode;
                user.Org = model.Org;
                user.ReceiveEmailAlert = model.ReceiveEmailAlert;
                user.IsActive = storedUser.IsActive;
                message = _userAdminRepository.EditUser(storedUser.Id, user);
                SendUserEditedMail(user, Request.Url.AbsoluteUri.Replace("UserOperation/Update", string.Empty));
            }
            return message;            
        }
        public string Delete(string userName)
        {
            return _userAdminRepository.RemoveUser(userName);
        }

        private void SendUserAddedMail(ApplicationUser user, string url)
        {
            string sendFrom = ConfigurationManager.AppSettings["UserCreationMailFrom"];
            string sendTo = user.Email;
            string subject = ConfigurationManager.AppSettings["UserCreationMailSubject"];
            subject = subject.Replace("$project_name$", "Reckitt Benckiser Dashboard");

            string body = ConfigurationManager.AppSettings["UserCreationMailBody"];
            body = body.Replace("$first_name$", user.FirstName);
            body = body.Replace("$last_name$", user.LastName);
            body = body.Replace("$project_name$", "Reckitt Benckiser Dashboard");
            body = body.Replace("$PASSWORD$", "123456");
            body = body.Replace("$user_id$", user.UserName);
            body = body.Replace("$project_url$", url);
            body = body.Replace("$systemAdmin_mailId$", ConfigurationManager.AppSettings["systemAdminMailId"]);

            EMail.SendMail(sendFrom, sendTo, subject, body);
        }

        private void SendUserEditedMail(ApplicationUser user, string url)
        {
            string sendFrom = ConfigurationManager.AppSettings["UserEditedMailFrom"];
            string sendTo = user.Email;
            string subject = ConfigurationManager.AppSettings["UserEditedMailSubject"];
            subject = subject.Replace("$project_name$", "Reckitt Benckiser Dashboard");

            string body = ConfigurationManager.AppSettings["UserEditedMailBody"];
            body = body.Replace("$first_name$", user.FirstName);
            body = body.Replace("$last_name$", user.LastName);
            body = body.Replace("$project_name$", "Reckitt Benckiser Dashboard");
            body = body.Replace("$user_id$", user.UserName);
            body = body.Replace("$project_url$", url);
            body = body.Replace("$systemAdmin_mailId$", ConfigurationManager.AppSettings["systemAdminMailId"]);

            EMail.SendMail(sendFrom, sendTo, subject, body);
        }
    }

}
