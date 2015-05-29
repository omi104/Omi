using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CubeFramework;
using Dashboard.IdentityModel.Repositories;
using Dashboard.Models.Data;
using DashboardFramework.DataComponent;
using Newtonsoft.Json;

namespace Dashboard.DataComponents.Transformers
{
    public class UserAdminTransformer : ITransformer<Dictionary<string, string>, UserData>
    {
        protected IUserAdminRepository UserAdminRepository { get; set; }

        public UserAdminTransformer()
        {
            UserAdminRepository = new UserAdminRepository();
        }

        public UserData GetData()
        {
            var geos = Input.ToDictionary(item => item.Value.Trim(), item => item.Value);
            var users = UserAdminRepository.GetActiveUsers();
            var userList = users.Select(user => new UserViewModel()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                UserName = user.UserName,
                ReceiveEmailAlert = user.ReceiveEmailAlert,
                Email = user.Email,
                IsActive = user.IsActive,
                Position = user.Position,
                GeoCode = user.GeoCode,
                Org = user.Org
            }).ToList();
            var userData = new UserData()
            {
                Users = JsonConvert.SerializeObject(userList),
                Geos = geos
            };
            return userData;
        }

        public Dictionary<string, string> Input { set; private get; }
    }
}