using System.Collections.Generic;
using System.Linq;
using Dashboard.IdentityModel.Repositories;
using Dashboard.Models.Data;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.DataSources
{

    public class UserAdminDataSource : IDataSource<List<UserViewModel>>
    {
        protected IUserAdminRepository UserAdminRepository { get; set; }

        public UserAdminDataSource()
        {
            UserAdminRepository = new UserAdminRepository();
        }

        public List<UserViewModel> GetData()
        {
            var users = UserAdminRepository.GetActiveUsers();
            return users.Select(user => new UserViewModel()
                {
                    FirstName = user.FirstName, LastName = user.LastName, Role = user.Role, UserName = user.UserName, ReceiveEmailAlert = user.ReceiveEmailAlert, Email = user.Email, IsActive = user.IsActive, Position = user.Position, GeoCode =  user.GeoCode, Org = user.Org
                }).ToList();
            
        }
        public string ConnectionString { get; set; }
        public string ModuleName { set; get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
    }
}