#region "using"
using CubeFramework;
using CubeFramework.ServiceModel;
using Dashboard.Configuration;
using Dashboard.DashboardComponent.Components;
using DashboardFramework;
using DashboardFramework.DataComponent;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using IMS.Logger;

#endregion

namespace Dashboard.DataComponents.DataSources
{
    public class CubeDataSourceBase : IDataSource<CubeData>
    {
        private string _connectionString;
        private string _dbConnectionString;
        private ICubeDataService _proxy;

        public virtual CubeData GetData()
        {
            ConstrainedViewId();
            if (string.IsNullOrWhiteSpace(ModuleName)) throw new ArgumentException("No view id is provided");

            int viewId;
            if (!Int32.TryParse(ModuleName, out viewId)) throw new ArgumentException(string.Format("View Id must be an integer but provide '{0}'", ModuleName));

            SetProxy();
            CubeData data = null;
            try
            {
                data = _proxy.GetCubeData(new CubeCommandInfo
                {
                    CommandText = ModuleName,
                    CommandType = CommandType.ViewId,
                    CubeConnectionString = ConnectionString,
                    DbConnectionString = DbConnectionString,
                    Parameters = GetCopyOfParameters(),
                    DataFormat = GetDataFormat()
                });
            }
            catch (Exception ex)
            {
                _proxy = null;
                Logger.Error(ex.Message);
            }
            return data;
        }

        private void ConstrainedViewId()
        {
            if (ModuleName == "6" && (Parameters.CurrentNavigationName() != NavigationItems.NavKSATerritoryLevel().Name && Parameters.CurrentNavigationName() != NavigationItems.NavAllRegions().Name))
            {
                ModuleName = "30";
            }
            if (ModuleName == "22" && Parameters.CurrentNavigationName() != NavigationItems.NavHome().Name)
                ModuleName = "7";
        }

        protected virtual void SetProxy()
        {
            if (_proxy != null) return;
            var host = ConfigurationManager.AppSettings["cfs:host"] ?? "localhost";
            var protocol = ConfigurationManager.AppSettings["cfs:protocol"] ?? "net.tcp";
            var serviceName = ConfigurationManager.AppSettings["cfs:serviceName"] ?? "CubeDataService";

            if (protocol.Equals("net.tcp", StringComparison.OrdinalIgnoreCase))
                _proxy = new NetTcpCubeDataServiceProxy(host);
            else
                _proxy = new NamedPipeCubeDataServiceProxy(serviceName);
        }

        protected virtual DataFormat GetDataFormat()
        {
            return DataFormat.Flat;
        }

        public string DbConnectionString
        {
            set { _dbConnectionString = value; }
            protected get
            {
                return string.IsNullOrWhiteSpace(_dbConnectionString) ? ConfigurationManager.ConnectionStrings[GetDatabaseName()].ConnectionString : _dbConnectionString;
            }
        }

        public string ConnectionString
        {
            set { _connectionString = value; }
            protected get
            {
                return string.IsNullOrWhiteSpace(_connectionString) ? ConfigurationManager.ConnectionStrings[GetCubeName()].ConnectionString : _connectionString;
            }
        }

        public string ModuleName { set; protected get; }


        public IReadOnlyDictionary<string, string> Parameters { set; private get; }

        protected virtual Dictionary<string, string> GetCopyOfParameters()
        {
            if (Logger.IsInfoEnabled()) LogParameters();

            var parametersCopy = Parameters.ToDictionary(p => p.Key, p => p.Value);
            return parametersCopy;
        }

        protected virtual void LogParameters()
        {
            var param = "Parameter for Module=" + ModuleName + Environment.NewLine;
            param = Parameters.Aggregate(param, (current, p) => current + ("key=" + p.Key + ",Value=" + p.Value + Environment.NewLine));
            Logger.Info(param);
        }

        protected virtual string GetDatabaseName()
        {
            return "DATA";
        }
        protected virtual string GetCubeName()
        {
            return "CUBE";
        }

    }

}