using System.Collections.Generic;
using Dashboard.IdentityModel.Entity;

namespace Dashboard.IdentityModel.Repositories
{
    public interface IUserAdminRepository
    {
        List<ApplicationUser> GetActiveUsers();
        ApplicationUser GetActiveUser(string userId);
        ApplicationUser GetUserByEmail(string email);
        string AddUser(string id, ApplicationUser applicationUser);
        string EditUser(string id, ApplicationUser user);
        string RemoveUser(string id);
        string ResetPassword(string id,string encryptedPassword);
        string ChangePassword(string userId, string oldPassword, string newPassword);
    }
}
