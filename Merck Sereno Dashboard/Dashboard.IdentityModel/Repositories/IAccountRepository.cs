// ©2013 IMS Software Services Ltd., All Rights Reserved.  IMS Software Services Confidential and Proprietary.

using Dashboard.IdentityModel.Entity;

namespace Dashboard.IdentityModel.Repositories
{
    public interface IAccountRepository
    {
        bool IsValidUser(string userId, string password, ApplicationUser applicationUser);
        ApplicationUser GetUser(string userName, string password);
        ApplicationUser GetLoggedInUser(string userName);
    }
}
