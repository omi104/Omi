using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideNodeIndustryOverview : ComplexNode
    {
        public string OverViewImage { get; set; }
        public string OverViewFilePath { get; set; }
        public string OverViewDownlaodText { get; set; }

        public string PannelChangeImage { get; set; }
        public string PannelChangeFilePath { get; set; }
        public string PannelChangeDownlaodText { get; set; }

        public GuideNodeIndustryOverview()
        {
            Classes.Add("guide-template1");
        }

        protected override void WriteInner(System.Xml.XmlWriter writer)
        {
            var anchorContainer = new ComplexNode();
            anchorContainer.Classes.Add("anchor");

            var anchorPpt = CreateAchor(OverViewImage, OverViewFilePath, OverViewDownlaodText);
            var anchorPdf = CreateAchor(PannelChangeImage, PannelChangeFilePath, PannelChangeDownlaodText);

            anchorContainer.ChildNodes.Add(anchorPpt);
            anchorContainer.ChildNodes.Add(anchorPdf);
            ChildNodes.Add(anchorContainer);

            base.WriteInner(writer);
        }

        private ComplexNode CreateAchor(string imagePath, string filePath, string text)
        {
            var anchor = new ComplexNode("a");
            anchor.Attributes.Add("href", "FileDownload/DownloadFile?fileName=" + filePath);

            var img = new SimpleNode("img", string.Empty);
            img.Attributes.Add("src", @"Content/Images/help/" + imagePath);

            anchor.ChildNodes.Add(img);

            var span = new SimpleNode("span", text);
            anchor.ChildNodes.Add(span);
            return anchor;
        }

    }
}