using System;

namespace IMS.Logger
{
    public interface ILogger
    {
        void Fatal(object message);
        void Fatal(object message, Exception exception);
        bool IsFatalEnabled { get; }

        void Debug(object message);
        void Debug(object message, Exception exception);
        bool IsDebugEnabled { get; }

        
        void Error(object message);
        void Error(object message, Exception exception);
        bool IsErrorEnabled { get; }

        void Info(object message);
        void Info(object message, Exception exception);
        bool IsInfoEnabled { get; }

        
        void Warn(object message);
        void Warn(object message, Exception exception);
        bool IsWarnEnabled { get; }
    }
}