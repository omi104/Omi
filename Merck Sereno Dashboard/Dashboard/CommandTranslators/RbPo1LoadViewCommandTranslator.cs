using System;
using DashboardFramework.Web.CommandTranslation.Translators;

namespace Dashboard.CommandTranslators
{
    public class RbPo1LoadViewCommandTranslator : LoadViewCommandTranslator 
    {
        protected override string GetErrorHtml(Exception exception)
        {
            return "<div  style='width: inherit; text-align: center'>No data found</div>";
        }
    }
}