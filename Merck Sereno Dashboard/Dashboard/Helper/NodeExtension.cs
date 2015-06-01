using System.Text;
using System.Xml;
using Component.Node;

namespace Dashboard.Helper
{
    public static class NodeExtension
    {
        public static string Render(this INode node)
        {
            var sb = new StringBuilder();
            var writer = XmlWriter.Create(sb);
            node.Render(writer);
            writer.Flush();

            return sb.ToString();
        }
    }


}