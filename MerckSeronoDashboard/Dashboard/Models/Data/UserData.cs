using System.Collections.Generic;
using Dashboard.Controllers.Widgets;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.IdentityModel.Entity;
using DashboardFramework.Configuration;

namespace Dashboard.Models.Data
{
    public class UserData
    {
        public string Users;
        public Dictionary<string, string> Geos;

        public List<ApplicationUser> ApplicationUsers;
    }



}