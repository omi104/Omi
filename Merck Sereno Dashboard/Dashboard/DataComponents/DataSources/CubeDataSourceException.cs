namespace Dashboard.DataComponents.DataSources
{
    using System;
    using System.Diagnostics.CodeAnalysis;

    [ExcludeFromCodeCoverage]
    public class CubeDataSourceException : Exception
    {
        public CubeDataSourceException(string message)
            : base(message)
        {

        }
    }
}