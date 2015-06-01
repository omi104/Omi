using System;

namespace IMS.Logger
{
    public static class ImsLogManager
    {
        public static ILogger GetLogger(Type type)
        {
            return new Log4NetWrapper(type);
        }
    }
}
