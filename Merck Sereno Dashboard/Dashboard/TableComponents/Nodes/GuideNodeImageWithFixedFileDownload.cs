using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideNodeImageWithFixedFileDownload : ComplexNode
    {
        private string _imagePath;
        private string _downloadFilePath;
        private string _downloadText;

        public GuideNodeImageWithFixedFileDownload(string imagePath, string downloadFilePath, string downloadText)
        {
            Classes.Add("guide-template1");
            _imagePath = imagePath;
            _downloadFilePath = downloadFilePath;
            _downloadText = downloadText;
        }

        protected override void WriteInner(System.Xml.XmlWriter writer)
        {
            var anchorContainer = new ComplexNode();
            anchorContainer.Classes.Add("anchor");

            var anchor = new ComplexNode("a");
            anchor.Attributes.Add("href", "FileDownload/DownloadFile?fileName=" + _downloadFilePath);

            var img = new SimpleNode("img", string.Empty);
            img.Attributes.Add("src", _imagePath);

            anchor.ChildNodes.Add(img);

            var span = new SimpleNode("span", _downloadText);
            anchor.ChildNodes.Add(span);


            anchorContainer.ChildNodes.Add(anchor);
            ChildNodes.Add(anchorContainer);

            base.WriteInner(writer);
        }

    }
}