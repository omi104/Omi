using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;

namespace Dashboard.TableComponents.Nodes
{
    public interface IGuideTableNodeBase<TData, TRowData>
    {
        TData Input { get; }
        void Render(XmlWriter writer);
    }
}