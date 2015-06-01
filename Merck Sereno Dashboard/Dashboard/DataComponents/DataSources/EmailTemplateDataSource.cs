using System.Collections.Generic;
using Dashboard.Configuration;
using Dashboard.IdentityModel.Entity;
using Dashboard.Repository;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.DataSources
{

    public class EmailTemplateDataSource : IDataSource<List<EmailTemplate>>
    {
        public EmailTemplateRepository EmailTemplateRepository { get; set; }
        public int TemplateId { get; set; }

        public EmailTemplateDataSource()
        {

        }
        public EmailTemplateDataSource(EmailTemplateRepository emailTemplateRepository)
        {
            EmailTemplateRepository = emailTemplateRepository;
        }

        public List<EmailTemplate> GetData()
        {
            var data = default(List<EmailTemplate>);
            if (ModuleName == StoredProcedure.GetEmailTemplateFilterData)
            {
                data = EmailTemplateRepository.GetEmailTemplateFilterData();
            }
            else if (ModuleName == StoredProcedure.GetEmailTemplate)
            {
                data = EmailTemplateRepository.GetEmailTemplate(TemplateId);
            }
            return data;
        }

        public string ConnectionString { get; set; }
        public string ModuleName { set; get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }

    }
}