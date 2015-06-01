using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;
using Dashboard.Configuration;

namespace Dashboard.TableComponents.Nodes
{
    public class ExportLinkExcelNode : ComplexNode
    {
        private readonly string _widgetName;
        private readonly string _code;
        public ExportLinkExcelNode(string widgetName, string code)
            : base("div")
        {
            Classes.Add("export");
            _widgetName = widgetName;
            _code = code;
        }

        protected override void WriteInner(System.Xml.XmlWriter writer)
        {
            var anchor = new ComplexNode("a");
            if ((_code == Guide.MvScopeMeasurement) || (_code == Guide.MvScopeCoverage) || (_code == Guide.MvScopePeriods) || (_code == Guide.MvScopeTimePeriodMapping))
            {
                anchor.Attributes.Add("href", "FileDownload/DownloadFile?filename=Scope_Definition.xlsx");
            }
            else if ((_code == Guide.MvExchangeRateDollar) || (_code == Guide.MvExchangeRateEuro) || (_code == Guide.MvExchangeRateMRFactor))
            {
                anchor.Attributes.Add("href", "FileDownload/DownloadFile?filename=Exchange_Rates.xlsx");
            }
            else
            {
                anchor.Attributes.Add("href", "javascript:CommandCenter.widgetExportClicked('xlsx','" + _widgetName + "');");
            }


            var image = new SimpleNode("img", string.Empty);
            image.Attributes.Add("alt", "Export to Excel");
            image.Attributes.Add("src", "Content/Images/xlsx.png");
            anchor.ChildNodes.Add(image);

            ChildNodes.Add(anchor);

            base.WriteInner(writer);
        }

    }
}