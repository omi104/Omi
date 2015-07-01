using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.Configuration
{
    public static class ParameterList
    {
        // copied from Rb
        /*
        public const string MGeo = "M_Geo";
        public const string MGeo_text = "M_Geo_text";
        public const string MMarket = "M_Market";
        public const string MMarketFilterParent = "M_MarketFilterParent";
        public const string MSubCategoryFilter = "M_SubCategoryFilter";
        public const string MSegment = "M_Segment";
        public const string MChannel = "M_Channel";
        public const string MSubChannel = "M_SubChannel";
        public const string MPeriodType = "M_PeriodType";
        public const string MPeriod = "M_Period";
        public const string MMeasure = "M_Measure";
        public const string MMeasureType = "M_Measure_Type";

        /// <summary>
         * 
         * */
        

        public const string RegionOrCluster = "RegionOrCluster";
        public const string Country = "Country";
        public const string Product = "Product";
        public const string Subproduct = "Subproduct";
        public const string SubProductFlag = "SubProductFlag";
        public const string PeriodTypeFlag = "PeriodTypeFlag";
        public const string Is_KSA = "Is_KSA";
        public const string Segment = "Segment";
        public const string Form = "Form";
        public const string KPI = "KPI";
        public const string UnitOrValue = "UnitOrValue";
        public const string RegionUncheckedItems = "RegionUncheckedItems";
        public const string KsaUncheckedItems = "KsaUncheckedItems";
        public const string TimePeriod = "TimePeriod";
        public const string StartDate = "StartDate";
        public const string EndDate = "EndDate";

        public const string RecordCount = "recordCount";
        public const string NavigationName = "NavigationName";
        public const string CurrentNavigationId = "CurrentNavigationId";
        public const string NavigationLabel = "Navigation_Label";
        public const string DeploymentIdentity = "Deployment_Identity";
        public const string RelationalData = "DATA_Business";
        public const string IsIMSUser = "IsIMSUser";
    }

    public static class MeasureType
    {
        public const string Sales = "sales";
        public const string MarketShare = "measure_Type";
    }
    public static class StoredProcedure
    {
        public const string GetEmailTemplate = "procGetEmailTemplate";
        public const string GetEmailTemplateFilterData = "procGetEmailTemplateFilterData";
        public const string GetHierarchicalGeoAndUser = "procGetHierarchicalGeoAndUser";
    }

    public static class Email
    {
        public const string UserNotFound = "User not found in the database.";
        public const string NewsletterMailFrom = "NewsletterMailFrom";
        public const string PasswordResetMailFrom = "PasswordResetMailFrom";
        public const string UserCreationMailFrom = "UserCreationMailFrom";
        public const string UserCreationMailSubject = "UserCreationMailSubject";
        public const string UserCreationMailBody = "UserCreationMailBody";
        public const string DefaultPassword = "DefaultPassword";
        public const string EmailReadReceiptToken = "Default.jjCustom";
        public const string Success = "Email sent successully";
        public const string All = "All";
        public const string Attachment = "Attachment";
        public const string BlankUserName = "User";

        public const string ClientFirstName = "`[Client's First Name]`";

        public const string UserId = "$user_id$";
        public const string FirstName = "$first_name$";
        public const string LastName = "$last_name$";
        public const string Password = "$PASSWORD$";
        public const string EmailAddress = "$EMAIL$";

        public const string ReadReceiptUpdated = "Read Receipt Updated";
    }
    public static class Guide
    {
        public const string MvMarketDefinition = "JJV-M";
        public const string OTCOverView = "JJO-OOverview";
        public const string OTCScopeMeasurementInfo = "JJO-SMeasurements";
        public const string MvNavigationOverView = "JJV-NOverview";
        public const string BiNavQuickGuide = "JJC-NQuick Guide";
        public const string BiNavFullGuide = "JJC-NFull Guide";

        public const string JnJAccountTeam = "JJ-AT";
        public const string JnJAccountTeamJnJ = "JJ-ATJNJ";
        public const string JnJAccountTeamIMS = "JJ-ATIMS";

        public const string MvScopeMeasurement = "JJV-SMeasurements";
        public const string MvScopeCoverage = "JJV-SCountry Panel";
        public const string MvScopePeriods = "JJV-SPeriods";
        public const string MvScopeTimePeriodMapping = "JJV-STime Period Mapping";

        public const string MvExchangeRate = "JJV-E";
        public const string MvExchangeRateDollar = "JJV-EDollar";
        public const string MvExchangeRateEuro = "JJV-EEuro";
        public const string MvExchangeRateMRFactor = "JJV-EM-R Factor";

        public const string MvUpdateSchedule = "Update-Schedule";
    }

}