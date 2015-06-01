using Dashboard.IdentityModel.Entity;

namespace Dashboard.IdentityModel.Repositories
{
    public class AccountRepository : IAccountRepository
    {

        private readonly IUserAdminRepository _userAdminRepository = new UserAdminRepository();
        //private ApplicationUser _user;

        public bool IsValidUser(string userId, string password, ApplicationUser applicationUser)
        {

            if (string.IsNullOrEmpty(userId))
            {
                return false;
            }
            if (string.IsNullOrEmpty(userId))
                return false;

            if (applicationUser.PasswordHash == password && applicationUser.UserName.ToLower() == userId.ToLower())
            {
                return true;
            }
            return false;
            
        }

        public ApplicationUser GetUser(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName))
                return null;

            var user = _userAdminRepository.GetActiveUser(userName);
            

            bool isValidUser = IsValidUser(userName, password,user);
            if (isValidUser)
            {
                return user;
            }
            return null;
        }

        public ApplicationUser GetLoggedInUser(string userName)
        {
            if (string.IsNullOrEmpty(userName))
                return null;

            var currentUser = _userAdminRepository.GetActiveUser(userName);
            return currentUser;
        }
    }
}
