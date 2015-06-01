using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class EmailTemplateButtonNode : SimpleNode
    {
        public EmailTemplateButtonNode(string name, string text, string onClickScript)
            : base(name, text)
        {
            Classes.Add("roundedButton");
            Attributes.Add("onclick", onClickScript);
        }
    }
}