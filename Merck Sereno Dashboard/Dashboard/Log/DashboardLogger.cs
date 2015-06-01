using System.Collections.Generic;
using System.Xml.Linq;
using DashboardFramework.Web.Logging;

namespace Dashboard.Log
{
    public class DashboardLogger : ILogger
    {

        public void Log(LogInfo logInfo)
        {
            if (!logInfo.IsSuccess)
            {
                if (logInfo.CommandResults != null)
                {
                    foreach (var commandResult in logInfo.CommandResults)
                    {
                        if (commandResult.HasError)
                        {
                            IMS.Logger.Logger.Fatal(commandResult.Error);
                        }
                    }
                }

                if (logInfo.Exception != null)
                {
                    IMS.Logger.Logger.Fatal(logInfo.Exception.Message, logInfo.Exception);
                }
            }
            

            if (IMS.Logger.Logger.IsDebugEnabled())
            {
                var errorString = string.Empty;

                errorString += "datetime:" + logInfo.DateTime;

                errorString += ", userId:" + logInfo.UserId;
                errorString += ", navigationName:" + logInfo.NavigationName;
                errorString += ", actionName:" + logInfo.ActionName;
                errorString += ", acionData:" + KeyValuePairsToXml(logInfo.ActionData, "ActionData", "Item");
                errorString += ", parameters:" + KeyValuePairsToXml(logInfo.Parameters, "Parameters", "Parameter");
                errorString += ", widgetStates:" + KeyValuePairsToXml(logInfo.WidgetStates, "WidgetStates", "State");
                errorString += ", isSuccess:" + logInfo.IsSuccess;
                errorString += ", exception:" + logInfo.Exception;
                errorString += ", totalServerExecutionTime:" + logInfo.CommandResults;
                errorString += ", commandsServerExecutionTime:" + logInfo.CommandResults;

                IMS.Logger.Logger.Info(errorString, logInfo.Exception);
            }
            
            
        }

        private string KeyValuePairsToXml(IEnumerable<KeyValuePair<string, string>> pairs, string rootName, string itemName)
        {
            if (pairs == null)
                return string.Empty;
            var root = new XElement(rootName);
            foreach (var pair in pairs)
            {
                var e = new XElement(itemName);
                e.SetAttributeValue("name", pair.Key);
                e.SetAttributeValue("value", pair.Value);
                root.Add(e);
            }

            return root.ToString();
        }
    }
}
