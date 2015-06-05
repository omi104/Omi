//using System.Collections.Generic;
//using System.Data;
//using System.Data.SqlClient;
//using System.Drawing;
//using System.Linq;
//using System.Web;
//using Dashboard.Configuration;
//using Dashboard.Configurations.Constant;
//using Dashboard.Helper;
//using Dashboard.IdentityModel.Context;
//using Dashboard.IdentityModel.Entity;
//using Dashboard.IdentityModel.Repositories;

//namespace Dashboard.Repository
//{
//    public class EmailTemplateRepository
//    {
//        protected readonly PortalDbContext PortalDbContext = new PortalDbContext();
//        public List<EmailTemplate> GetEmailTemplate(int templateId)
//        {
//            var parameters = new SqlParameter[1];

//            parameters[0] = new SqlParameter();
//            parameters[0].SqlDbType = SqlDbType.Int;
//            parameters[0].ParameterName = "@p_TemplateId";
//            parameters[0].Value = templateId;

//            string sql = StoredProcedure.GetEmailTemplate.AppendParameterList(parameters);
//            var selectedData = PortalDbContext.Database.SqlQuery<EmailTemplate>(sql, parameters).ToList();
            
//            return selectedData;
//        }

//        public List<EmailTemplate> GetEmailTemplateFilterData()
//        {
//            var parameters = new SqlParameter[0];
//            string sql = StoredProcedure.GetEmailTemplateFilterData.AppendParameterList(parameters);
//            var selectedData = PortalDbContext.Database.SqlQuery<EmailTemplate>(sql, parameters).ToList();
//            return selectedData;
//        }
//        public string GetHierarchicalGeoAndUserXml()
//        {
//            var isAdminUser = 0;
//            var user = HttpContext.Current.Session[FixedData.Other.LoggedInUser] as ApplicationUser;
//            if (user == null)
//            {
//                user = new AccountRepository().GetLoggedInUser(HttpContext.Current.User.Identity.Name);
//            }

//            var admin = user.Role;

//            if (admin == "Admin")
//            {
//                isAdminUser = 1;
//            }

//            var parameters = new SqlParameter[1];
//            parameters[0] = new SqlParameter();
//            parameters[0].SqlDbType = SqlDbType.Int;
//            parameters[0].ParameterName = "@p_IsAdmin";
//            parameters[0].Value = isAdminUser;

//            string sql = StoredProcedure.GetHierarchicalGeoAndUser.AppendParameterList(parameters);

//            var result = PortalDbContext.Database.SqlQuery<string>(sql, parameters).FirstOrDefault();
//            result = result.Replace("UserHierarchy", "users");
//            return result;
//        }
        
//    }
//}
