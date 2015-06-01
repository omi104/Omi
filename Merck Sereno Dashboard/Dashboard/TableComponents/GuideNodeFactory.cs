using System;
using System.Linq;
using Component.Node;
using Dashboard.Helper;
using Dashboard.IdentityModel.Repositories;
using Dashboard.Repository;
using Dashboard.TableComponents.Nodes;
using Dashboard.ViewModels;

namespace Dashboard.TableComponents
{
    public class GuideNodeFactory
    {
        protected IUserAdminRepository UserAdminRepository { get; set; }
        private readonly string _widgetName;

        public GuideNodeFactory()
        {
            UserAdminRepository = new UserAdminRepository();
        }

        public GuideNodeFactory(string widgetName)
        {
            _widgetName = widgetName;
            UserAdminRepository = new UserAdminRepository();
        }
        public INode GetNode(string code)
        {
            if (string.IsNullOrEmpty(code))
                return new NullNode();

            //Exchange Rate
            if (code.Equals("JJV-M", StringComparison.CurrentCultureIgnoreCase))
            {
                return new GuideNodeImageWithFixedFileDownload("Content/Images/help/category_definition.PNG", "/RB_Po1_Category_Definition.xlsx", "Download Market Definition");
            }
            if (code.Equals("JJV-EDollar", StringComparison.CurrentCultureIgnoreCase))
            {
                return new GuideNodeImageWithFixedFileDownload("Content/Images/help/exchange_rate.PNG", "/Exchange_Rates_Dollar.xls", "Download Exchange Rate - Dollar");
            }
            if (code.Equals("JJV-EEuro", StringComparison.CurrentCultureIgnoreCase))
            {
                return new GuideNodeImageWithFixedFileDownload("Content/Images/help/exchange_rate.PNG", "/Exchange_Rates_Euro.xls", "Download Exchange Rate - Euro");
            }
            if (code.Equals("JJV-EM-R Factor", StringComparison.CurrentCultureIgnoreCase))
            {
                return new GuideNodeImageWithFixedFileDownload("Content/Images/help/exchange_rate.PNG", "/Exchange_Rates_M-R_Factor.xls", "Download Exchange Rate - M-R Factor");
            }
            //Your Account
            if (code.Equals("YACP", StringComparison.CurrentCultureIgnoreCase))
            {
                return new GuideNodeFixedImage("Content/Images/help/change-password.JPG");
            }
            if (code.Equals("YASL", StringComparison.CurrentCultureIgnoreCase))
            {
                return new GuideNodeFixedImage("Content/Images/help/save-login-details.JPG");
            }
            if (code.Equals("YARP", StringComparison.CurrentCultureIgnoreCase))
            {
                return new GuideNodeFixedImage("Content/Images/help/forgotten-password.JPG");
            }
            //Scope
            if (code.Equals("JJV-SMeasurements", StringComparison.CurrentCultureIgnoreCase))
            {
                return new GuideNodeImageWithFixedFileDownload("Content/Images/help/scope.PNG", "/Scope - Measurement.xlsx", "Scope Measurement");
            }
            if (code.Equals("JJV-SCountry Panel", StringComparison.CurrentCultureIgnoreCase))
            {
                return new GuideNodeImageWithFixedFileDownload("Content/Images/help/scope.PNG", "/Scope - Coverage.xlsx", "Scope Coverage");
            }
            if (code.Equals("JJV-SPeriods", StringComparison.CurrentCultureIgnoreCase))
            {
                return new GuideNodeImageWithFixedFileDownload("Content/Images/help/scope.PNG", "/Scope - Periods.xlsx", "Scope Periods");
            }
            if (code.Equals("JJ-ATJNJ", StringComparison.CurrentCultureIgnoreCase)
                || code.Equals("JJ-ATIMS", StringComparison.CurrentCultureIgnoreCase)
                )
            {
                var orgKey = code.Equals("JJ-ATJNJ", StringComparison.CurrentCultureIgnoreCase) ? "rb" : "ims";
                var data = UserAdminRepository.GetActiveUsers().Where(x => x.Org!= null && x.Org.ToLower() == orgKey).Select(user => new UserViewModel()
                {
                    FirstName = user.FirstName, LastName = user.LastName, Role = user.Role, UserName = user.UserName, ReceiveEmailAlert = user.ReceiveEmailAlert, Email = user.Email, IsActive = user.IsActive, Position = user.Position, GeoCode =  user.GeoCode, Org = user.Org
                }).ToList();

                return new GuideMvScopeSubNode(_widgetName, new ExportLinkExcelNode(_widgetName, code), new GuideTableUserListNode(data));
            }

            return new GuideNodeImageWithFixedFileDownload("Content/Images/help/category_definition.PNG", "/RB_Po1_Category_Definition.xlsx", "Download Market Definition");
            
            //if (code.Equals("JJO-OOverview", StringComparison.CurrentCultureIgnoreCase))
            //{
            //    return new GuideNodeIndustryOverview()
            //    {
            //        OverViewImage = "IndustryViewOverViewPpt.png",
            //        OverViewFilePath = "OTC Global Analysis_Offering Overview_2014 v2.pptx",
            //        OverViewDownlaodText = "Download Overview information",

            //        PannelChangeImage = "IndustryViewUpdatePanelChangesQ2.png",
            //        PannelChangeFilePath = "Global Analyser New Panel Q2 Update.pdf",
            //        PannelChangeDownlaodText = "Download Q2 2014 Panel Information",
            //    };
            //}

            //if (code.Equals("JJO-SMeasurements", StringComparison.CurrentCultureIgnoreCase))
            //{
            //    return new GuideNodeImageWithFixedFileDownload("Content/Images/help/ScopeThumb.jpg", "/Scope_Definition_OTC_Industry_View.xlsx", "Download Measurements information");
            //}


            //if (code.Equals("JJV-NOverview", StringComparison.CurrentCultureIgnoreCase))
            //{
            //    return new GuideNodeFixedImage("Content/Images/help/Page-2.png");
            //}
            //if (code.Equals("JJC-NQuick Guide", StringComparison.CurrentCultureIgnoreCase))
            //{
            //    return new GuideNodeFixedImage("Content/Images/help/QuickGuide.png");
            //}
            //if (code.Equals("JJC-NFull Guide", StringComparison.CurrentCultureIgnoreCase))
            //{
            //    return new GuideNodeImageWithFixedFileDownload("Content/Images/help/FullGuideThumb.jpg", "/Full_Guide.ppt", "Download Full Guide");
            //}

            ////
            //if (code.Equals("YACP", StringComparison.CurrentCultureIgnoreCase))
            //{
            //    return new GuideNodeFixedImage("Content/Images/help/ChangePassword.png");
            //}
            //if (code.Equals("YASL", StringComparison.CurrentCultureIgnoreCase))
            //{
            //    return new GuideNodeFixedImage("Content/Images/help/SaveLoginDetails.png");
            //}
            //if (code.Equals("YARP", StringComparison.CurrentCultureIgnoreCase))
            //{
            //    return new GuideNodeFixedImage("Content/Images/help/ResetPassword.png");
            //}




            //if (code.Equals("JJV-SMeasurements", StringComparison.CurrentCultureIgnoreCase))
            //{
            //    var data = _helpRepository.GetGuideScopeMeasurement();
            //    var node = new GuideMvScopeSubNode(_widgetName, new ExportLinkExcelNode(_widgetName, code), new GuideTableMeasurementNode(data));
            //    return node;
            //}
            //if (code.Equals("JJV-SCountry Panel", StringComparison.CurrentCultureIgnoreCase))
            //{
            //    var data = _helpRepository.GetGuideScopeCoverage();
            //    var node = new GuideMvScopeSubNode(_widgetName, new ExportLinkExcelNode(_widgetName, code), new GuideTableCoverageNode(data));
            //    return node;
            //}
            //if (code.Equals("JJV-SPeriods", StringComparison.CurrentCultureIgnoreCase))
            //{
            //    var data = _helpRepository.GetGuideScopePeriod();
            //    return new GuideMvScopeSubNode(_widgetName, new ExportLinkExcelNode(_widgetName, code), new GuideTablePeriodNode(data));
            //}
            //if (code.Equals("JJV-STime Period Mapping", StringComparison.CurrentCultureIgnoreCase))
            //{
            //    var data = _helpRepository.GetGuideScopeTimePeriodMapping();
            //    return new GuideMvScopeSubNode(_widgetName, new ExportLinkExcelNode(_widgetName, code), new GuideTableTimePeriodMappingNode(data));
            //}
            //if (code.Equals("JJV-EDollar", StringComparison.CurrentCultureIgnoreCase)
            //    || code.Equals("JJV-EEuro", StringComparison.CurrentCultureIgnoreCase)
            //    || code.Equals("JJV-EM-R Factor", StringComparison.CurrentCultureIgnoreCase)
            //    )
            //{
            //    var currency = code.Replace("JJV-E", string.Empty).Replace("-", string.Empty).Replace(" ", string.Empty);
            //    var data = _helpRepository.GetExchangeRates(currency);
            //    return new GuideMvScopeSubNode(_widgetName, new ExportLinkExcelNode(_widgetName, code), new GuideTableExchangeRateNode(data));
            //}


            //if (code.Equals("JJ-ATJNJ", StringComparison.CurrentCultureIgnoreCase)
            //    || code.Equals("JJ-ATIMS", StringComparison.CurrentCultureIgnoreCase)
            //    )
            //{
            //    var orgKey = code.Replace("JJ-AT", string.Empty);
            //    var data = _helpRepository.GetOrganizationwiseActiveUser(orgKey);
            //    return new GuideMvScopeSubNode(_widgetName, new ExportLinkExcelNode(_widgetName, code), new GuideTableUserListNode(data));
            //}

            return new NullNode();
        }


    }
}