using System;

namespace IMS.Logger
{
    public static class Logger
    {
        private static ILogger _log = null;

        private static ILogger GetInstance()
        {
            if (_log == null)
            {
                Logger._log = ImsLogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
                log4net.Config.XmlConfigurator.Configure();
            }

            return _log;
        }
        public static void Fatal(object message)
        {
            Logger.GetInstance().Fatal(message);
        }
        public static void Fatal(object message, Exception exception)
        {
            Logger.GetInstance().Fatal(message, exception);
        }
        public static bool IsFatalEnabled()
        {
            return Logger.GetInstance().IsFatalEnabled;
        }

        public static void Error(object message)
        {
            Logger.GetInstance().Error(message);
        }
        public static void Error(object message, Exception exception)
        {
            Logger.GetInstance().Error(message, exception);
        }
        public static bool IsErrorEnabled()
        {
            return Logger.GetInstance().IsErrorEnabled;
        }

        public static void Info(object message)
        {
            Logger.GetInstance().Info(message);
        }
        public static void Info(object message, Exception exception)
        {
            Logger.GetInstance().Info(message, exception);
        }
        public static bool IsInfoEnabled()
        {
            return Logger.GetInstance().IsInfoEnabled;
        }

        public static void Warn(object message)
        {
            Logger.GetInstance().Warn(message);
        }
        public static void Warn(object message, Exception exception)
        {
            Logger.GetInstance().Warn(message, exception);
        }
        public static bool IsWarnEnabled()
        {
            return Logger.GetInstance().IsWarnEnabled;
        }

        public static void Debug(object message)
        {
            Logger.GetInstance().Debug(message);
        }
        public static void Debug(object message, Exception exception)
        {
            Logger.GetInstance().Debug(message, exception);
        }
        public static bool IsDebugEnabled()
        {
            return Logger.GetInstance().IsDebugEnabled;
        }
    }

}
