using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Dashboard.Helper
{
    public static class RepositoryExtension
    {
        public static string AppendParameterList(this string storedProcedure, SqlParameter[] parameters)
        {
            var executionCommand = "exec " + storedProcedure + " ";

            bool isStart = true;
            foreach (var parameter in parameters)
            {
                if (isStart)
                {
                    isStart = false;
                }
                else
                {
                    executionCommand += ",";
                }
                executionCommand += parameter.ParameterName + "=" + parameter.ParameterName;
            }

            if (IMS.Logger.Logger.IsInfoEnabled())
            {
                var logStatement = AppendParameterListForLog(storedProcedure, parameters);
                IMS.Logger.Logger.Info("Execution Statement = " + logStatement);
            }

            return executionCommand;
        }

        public static string AppendParameterListForLog(this string storedProcedure, SqlParameter[] parameters)
        {
            var executionCommand = "exec " + storedProcedure + " ";
            bool isStart = true;
            foreach (var parameter in parameters)
            {
                if (isStart)
                {
                    isStart = false;
                }
                else
                {
                    executionCommand += ",";
                }
                executionCommand += parameter.ParameterName + "=N'" + parameter.Value + "'";
            }

            return executionCommand;
        }

        public static SqlParameter GetParameter(string parameterName, SqlDbType dataType, object value, ParameterDirection parameterDirection = ParameterDirection.Input)
        {
            var sqlParameter = new SqlParameter();
            sqlParameter.ParameterName = parameterName;
            sqlParameter.SqlDbType = dataType;
            if (value == null)
            {
                sqlParameter.Value = DBNull.Value;
            }
            else
            {
                sqlParameter.Value = value;
            }

            sqlParameter.Direction = parameterDirection;
            return sqlParameter;
        }

    }
}