using System;

namespace IMS.Logger
{
    public class Log4NetWrapper : ILogger
    {
        private readonly log4net.ILog _logger;

        public Log4NetWrapper(Type type)
        {
            _logger = log4net.LogManager.GetLogger(type);
        }

        public void Fatal(object message)
        {
            _logger.Fatal(message);
        }

        public void Fatal(object message, Exception exception)
        {
            _logger.Fatal(message, exception);
        }

        public bool IsFatalEnabled
        {
            get { return _logger.IsFatalEnabled; }
        }

        public void Debug(object message)
        {
            _logger.Debug(message);
        }

        public void Debug(object message, Exception exception)
        {
            _logger.Debug(message, exception);
        }

        public bool IsDebugEnabled 
        {
            get { return _logger.IsDebugEnabled; } 
        }
        public void Error(object message)
        {
            _logger.Error(message);
        }

        public void Error(object message, Exception exception)
        {
            _logger.Error(message, exception);
        }

        public bool IsErrorEnabled
        {
            get { return _logger.IsErrorEnabled; }
        }
        public void Info(object message)
        {
            _logger.Info(message);
        }

        public void Info(object message, Exception exception)
        {
            _logger.Info(message, exception);
        }

        public bool IsInfoEnabled
        {
            get { return _logger.IsInfoEnabled; }
        }
        public void Warn(object message)
        {
            _logger.Warn(message);
        }

        public void Warn(object message, Exception exception)
        {
            _logger.Warn(message, exception);
        }

        public bool IsWarnEnabled
        {
            get { return _logger.IsWarnEnabled; }
        }
    }
}
