using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.Configuration
{
    public static class ParameterList
    {
        public const string EmailTemplate = "EmailTemplate";
        public const string RecordCount = "recordCount";
        public const string RbGeo = "RB_Geo";
        public const string RbGeo_text = "RB_Geo_text";
        public const string RbMarket = "RB_Market";
        public const string RbMarketFilterParent = "RB_MarketFilterParent";
        public const string RbSubCategoryFilter = "RB_SubCategoryFilter";
        public const string RbSegment = "RB_Segment";
        public const string RbChannel = "RB_Channel";
        public const string RbSubChannel = "RB_SubChannel";
        public const string RbPeriodType = "RB_PeriodType";
        public const string RbPeriod = "RB_Period";
        public const string RbMeasure = "RB_Measure";
        public const string RbMeasureType = "RB_Measure_Type";
        public const string NavigationName = "NavigationName";
        public const string UncheckedItems = "uncheckedItems";
        public const string AbsoluteThousandFilter = "absoluteThousandConversion";
        public const string CurrentNavigationId = "CurrentNavigationId";
        public const string NavigationLabel = "Navigation_Label";

        public const string TopCountCompanyAtAGlance = "RB_TopCountComGlance";
        public const string TopCountCompanySnapshot = "RB_ComSnapshotTopCount";
        public const string TopCountCompanyTrend = "RB_ComTrendTopCount";

        public const string TopCountBrandAtAGlance = "RB_TopCountBrandGlance";
        public const string TopCountBrandSnapshot = "RB_TopCountBrandSnapshot";
        public const string TopCountBrandTrend = "RB_TopCountBrandTrend";

        public const string TopCountSubBrandAtAGlance = "RB_TopCountSubBrandGlance";
        public const string TopCountSubBrandSnapshot = "RB_TopCountSubBrandSnapshot";
        public const string TopCountSubBrandTrend = "RB_TopCountSubBrandTrend";

        public const string TopCountMoleculeAtaGlance = "RB_TopCountMoleculeAtaGlance";
        public const string TopCountMoleculeSnapshot = "RB_TopCountMoleculeSnapshot";
        public const string TopCountMoleculeTrend = "RB_TopCountMoleculeTrend";

        public const string TopCountSKUAtAGlance = "RB_TopCountSKUGlance";
        public const string TopCountSKUSnapshot = "RB_TopCountSKUSnapshot";
        public const string TopCountSKUTrend = "RB_TopCountSKUTrend";

        public const string TopCountCategoryTrend = "RB_CategoryTrendTopCount";

        public const string GuideLevel = "GuideLevel";

        public const string DeploymentIdentity = "Deployment_Identity";
        public const string RelationalData = "DATA_Business";

        public const string HoverRowItem = "HoverRowItem";

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