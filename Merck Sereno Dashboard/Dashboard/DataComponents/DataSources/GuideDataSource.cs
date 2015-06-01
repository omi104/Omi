using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;
using Dashboard.Repository;
using Dashboard.TableComponents;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.DataSources
{
    public class GuideDataSource : IDataSource<INode>
    {
        public string NavigationName { get; set; }

        public INode GetData()
        {
            return new GuideNodeFactory(NavigationName).GetNode(ModuleName);
        }

        public string ConnectionString { private get; set; }

        public string ModuleName { set; protected get; }

        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
    }
}