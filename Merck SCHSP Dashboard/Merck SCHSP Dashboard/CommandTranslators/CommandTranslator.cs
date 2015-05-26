using System;
using DashboardFramework.Web.CommandTranslation.Translators;

namespace Merck_SCHSP_Dashboard.CommandTranslators
{
    public class CommandTranslator : LoadViewCommandTranslator 
    {
        protected override string GetErrorHtml(Exception exception)
        {
            return "<div  style='width: inherit; text-align: center'>No data found</div>";
        }
    }
}