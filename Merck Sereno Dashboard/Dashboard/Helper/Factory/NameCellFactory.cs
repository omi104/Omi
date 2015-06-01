using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;
using Dashboard.Models.Data;

namespace Dashboard.Helper.Factory
{
    public class NameCellFactory : NodeFactoryBase<object, NodeBase>
    {
        private readonly string _nodeName;
        private readonly TextFormat _textFormat;
        public bool IsMakeTextShort { get; set; }
        public int NameCollength { get; set; }
        public bool IsMoleculeAtAGlance { get; set; }
        public bool IsBrandAtAGlance { get; set; }
        public bool IsSubbrandAtAGlance { get; set; }
        public int ChildLevel { get; set; }
        public NameCellFactory(TextFormat textFormat, string nodeName = "td")
        {
            NameCollength = 13;
            IsMakeTextShort = false;
            _textFormat = textFormat;
            _nodeName = nodeName;
        }

        public NameCellFactory(string format = null, string prefix = null, string suffix = null,
                                          string nodeName = "td")
            : this(new TextFormat { FormatString = format, Prefix = prefix, Suffix = suffix }, nodeName)
        {

        }

        protected override NodeBase CreateInternal(Object value)
        {
            var data = (ExpandCollapseCellData)value;
            if (data.CellData == null)
                data.CellData = string.Empty;

            if (string.IsNullOrWhiteSpace(data.CellData))
                return new SimpleNode("td", string.Empty);
                
            if (_textFormat != null)
                data.CellData = _textFormat.Format(data.CellData);
            
            SimpleNode node;
            var splitData = data.CellData.Split('#');
            if (IsMakeTextShort && IsSubbrandAtAGlance && splitData.Length>1)//Subbrand
            {
                node = new SimpleNode("td", splitData[splitData.Length-1])
                {
                    Attributes = new Dictionary<string, string>()
                    {
                        {"title",splitData[splitData.Length-3] + "-" + splitData[splitData.Length-2]},
                    }
                };
            }
            else if (IsMakeTextShort && IsBrandAtAGlance && splitData.Length > 1)//Brand
            {
                node = new SimpleNode("td", splitData[splitData.Length - 1])
                {
                    Attributes = new Dictionary<string, string>()
                    {
                        {"title",splitData[splitData.Length-2]},
                    }
                };
            }
            else if (IsMakeTextShort && !data.CellData.ToUpper().Contains("RECKITT") && data.CellData.Length > NameCollength)
            {
                node = new SimpleNode("td", data.CellData.Substring(0, NameCollength - 1) + "...")
                {
                    Attributes = new Dictionary<string, string>()
                    {
                        {"title",data.CellData},
                    }
                };
            }
            else
                node = new SimpleNode("td", data.CellData);

            if (data.Level == 1 && data.GeoLevel == 1)
            {
                node.Styles.Add("padding-left", "0px");
            }
            if (data.Level == 2 && data.GeoLevel == 1)
            {
                node.Styles.Add("padding-left", "7px");
            }
            if (data.Level == 3 && data.GeoLevel == 1)
            {
                node.Styles.Add("padding-left", "14px");
            }

            if (data.Level == 1 && data.GeoLevel == 2)
            {
                node.Styles.Add("padding-left", "7px");
            }
            if (data.Level == 2 && data.GeoLevel == 2)
            {
                node.Styles.Add("padding-left", "14px");
            }
            if (data.Level == 3 && data.GeoLevel == 2)
            {
                node.Styles.Add("padding-left", "21px");
            }

            if (data.Level == 1 && data.GeoLevel == 3)
            {
                node.Styles.Add("padding-left", "14px");
            }
            if (data.Level == 2 && data.GeoLevel == 3)
            {
                node.Styles.Add("padding-left", "21px");
            }
            if (data.Level == 3 && data.GeoLevel == 3)
            {
                node.Styles.Add("padding-left", "28px");
            }
           

            return node;
        }

        
    }
}