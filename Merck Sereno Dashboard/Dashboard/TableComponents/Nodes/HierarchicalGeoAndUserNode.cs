using System.Linq;
using System.Xml;
using System.Xml.Linq;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class HierarchicalGeoAndUserNode : ComplexNode
    {
        private readonly string _data;
        public HierarchicalGeoAndUserNode(string xmlData)
            : base("div")
        {
            _data = xmlData;
            Attributes.Add("style", "padding:2px;");
            Classes.Add("base");
        }

        protected override void WriteInner(XmlWriter writer)
        {
            var elements = XElement.Parse(_data);

            const string id = "ALL";
            ChildNodes.Add(new InputNode("ALL", id));

            foreach (var org in elements.Elements("org"))
            {
                ChildNodes.Add(new OrgNode(org, id, 0));
            }

            base.WriteInner(writer);
        }
    }

    class OrgNode : ComplexNode
    {
        protected readonly XElement Data;
        protected readonly string ParentId;
        protected int Level;
        public OrgNode(XElement xml, string parentId, int level)
            : base("div")
        {
            Data = xml;
            ParentId = ClearNonIdText(parentId);
            Level = level;

            string style = "clear:both;";
            style += "padding-left:" + (Level * 15 + "px;");
            if (Level > 0)
            {
                style += "display:none;";
            }
            Attributes.Add("style", style);

            Classes.Add("level-"+Level);

        }

        protected override void WriteInner(XmlWriter writer)
        {
            var nodeName = Data.Attribute("name").Value;
            nodeName = ClearNonIdText(nodeName);
            var nodeId = nodeName;
            var combinedId = ParentId + "_" + nodeName;


            ChildNodes.Add(new DivAdminTreeNode(combinedId, ParentId));

            var input = new InputNode(nodeName, nodeId, ParentId);
            ChildNodes.Add(input);

            AddChild(Data, combinedId);


            if (Data.Elements("users").Count() > 0)
            {
                foreach (var org in Data.Element("users").Elements("user"))
                {
                    ChildNodes.Add(new UserNode(org, combinedId));
                }
            }
            base.WriteInner(writer);
        }

        protected virtual void AddChild(XElement data, string combinedId)
        {
            foreach (var org in Data.Elements("market"))
            {
                ChildNodes.Add(new MarketNode(org, combinedId, Level + 1));
            }
        }

        protected string ClearNonIdText(string value)
        {
            //value = value.Replace(" ", string.Empty).Replace(".", string.Empty).Replace("@", string.Empty);
            value = value.Replace(" ", "_").Replace(".", string.Empty).Replace("@", string.Empty);
            return value;
        }

    }

    class MarketNode : OrgNode
    {

        public MarketNode(XElement xml, string parentId, int level)
            : base(xml, parentId, level)
        {

        }

        protected override void AddChild(XElement data, string combinedId)
        {
            foreach (var item in Data.Elements("cluster"))
            {
                ChildNodes.Add(new ClusterNode(item, combinedId, Level + 1));
            }
        }
    }

    class ClusterNode : OrgNode
    {

        public ClusterNode(XElement xml, string parentId, int level)
            : base(xml, parentId, level)
        {

        }

        protected override void AddChild(XElement data, string combinedId)
        {
            foreach (var item in Data.Elements("country"))
            {
                ChildNodes.Add(new CountryNode(item, combinedId, Level + 1));
            }
        }
    }

    class CountryNode : OrgNode
    {
        public CountryNode(XElement xml, string parentId, int level)
            : base(xml, parentId, level)
        {
        }

        protected override void AddChild(XElement data, string combinedId)
        {
            ;
        }
    }

    class UserNode : ComplexNode
    {
        private readonly XElement _data;
        private readonly string _parentId;
        public UserNode(XElement orgXml, string parentId)
            : base("div")
        {
            _data = orgXml;
            _parentId = parentId;
            Attributes.Add("style", "display:none;clear: both;padding-left:18px;");
        }

        protected override void WriteInner(XmlWriter writer)
        {
            var aNode = new SimpleNode("div", string.Empty);
            aNode.Attributes.Add("parentId", _parentId);
            aNode.Attributes.Add("style", "display:none;float:left;");
            ChildNodes.Add(aNode);
            ChildNodes.Add(new UserInputNode(_data, _parentId));
            ChildNodes.Add(new UserImageNode());

            var userName = _data.Attribute("firstName").Value + " " + _data.Attribute("lastName").Value;
            ChildNodes.Add(new UserNameNode(userName));


            base.WriteInner(writer);
        }
    }

    class DivAdminTreeNode : SimpleNode
    {
        public DivAdminTreeNode(string id, string parentId)
            : base("div", string.Empty)
        {
            Classes.Add("div-admin-tree");
            Attributes.Add("parentId", parentId);
            Attributes.Add("style", "float:left;");
            Attributes.Add("id", id);

        }
    }

    class InputNode : SimpleNode
    {
        public InputNode(string value, string id, string parentId = null)
            : base("input", value)
        {
            Attributes.Add("type", "checkbox");
            Attributes.Add("id", id);
            if (!string.IsNullOrEmpty(parentId))
            {
                Attributes.Add("parentId", parentId);
            }
        }
    }

    class UserInputNode : SimpleNode
    {
        public UserInputNode(XElement user, string parentId)
            : base("input", string.Empty)
        {
            var email = user.Attribute("email").Value;
            email = email.Replace(" ", string.Empty).Replace(".", string.Empty).Replace("@", string.Empty);

            Attributes.Add("type", "checkbox");
            Attributes.Add("style", "float:left;");
            Attributes.Add("id", "chk" + email);
            Attributes.Add("parentId", parentId);

            Attributes.Add("text", user.Attribute("firstName").Value + " " + user.Attribute("lastName").Value);
            Attributes.Add("value", user.Attribute("email").Value);
        }
    }

    class UserImageNode : SimpleNode
    {
        public UserImageNode()
            : base("img", string.Empty)
        {
            Attributes.Add("src", "Content/Images/emailTemplate/icon_user.gif");
            Attributes.Add("style", "width:21px;height:16px;padding-right:5px;float:left;");
            Attributes.Add("alt", "User");
        }
    }

    class UserNameNode : SimpleNode
    {
        public UserNameNode(string name)
            : base("div", name)
        {
            Attributes.Add("style", "float:left;");
        }
    }
}
