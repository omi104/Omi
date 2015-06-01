using System;
using System.IO;

namespace Dashboard.DataComponents.Helper
{
    public class ForgotPasswordGetInfo
    {
        public Tuple<string, DateTime> GetInfoFromParameter(string parameters, TextReader privateKeyFromFile, TextReader publicKeyFromFile)
        {
            
            Encryption encryption = new Encryption();
            var loginUrl = encryption.Decrypt(parameters.Replace(" ", "+"), privateKeyFromFile, publicKeyFromFile);
            var domainUserName = loginUrl.Split("_^_".ToCharArray(), StringSplitOptions.None);
            var userName = domainUserName[0];

            var urlTime = Convert.ToDateTime(domainUserName[3]);

            return new Tuple<string, DateTime>(userName, urlTime);
        }
    }
}