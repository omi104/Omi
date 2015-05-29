using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Dashboard.Helper
{
    public class CryptographyHelper
    {

        public string Encrypt(string privateKey, string publicKey, string plainText)
        {
            var privateRSaCryp = new RSACryptoServiceProvider();
            privateRSaCryp.FromXmlString(privateKey);
            var publicRSaCryp = new RSACryptoServiceProvider();
            publicRSaCryp.FromXmlString(publicKey);
            var byteConverter = new ASCIIEncoding();
            var originalData = byteConverter.GetBytes(plainText);
            var signature = privateRSaCryp.SignData(originalData, SHA1.Create());
            var modifiedPlainText = plainText + "_^_" + Convert.ToBase64String(signature);
            var returnResult =
                Convert.ToBase64String(publicRSaCryp.Encrypt(Encoding.UTF8.GetBytes(modifiedPlainText.Substring(0, 117)),
                                                             false));
            returnResult +=
                Convert.ToBase64String(publicRSaCryp.Encrypt(Encoding.UTF8.GetBytes(modifiedPlainText.Substring(117)), false));
            return returnResult;
        }

        public string Decrypt(string cipherText)
        {

            TextReader privateKeyFromFile = new StreamReader(HttpContext.Current.Server.MapPath("~/App_Data/IMSPrivateKey.xml"));
            TextReader publicKeyFromFile = new StreamReader(HttpContext.Current.Server.MapPath("~/App_Data/JnJPublicKey.xml"));
            var privateKey = new RSACryptoServiceProvider();
            privateKey.FromXmlString(privateKeyFromFile.ReadToEnd());
            var publicKey = new RSACryptoServiceProvider();
            publicKey.FromXmlString(publicKeyFromFile.ReadToEnd());

            var byteConverter = new ASCIIEncoding();
            var result =
                Encoding.ASCII.GetString(privateKey.Decrypt(Convert.FromBase64String(cipherText.Substring(0, 172)),
                                                            false));
            result +=
                Encoding.ASCII.GetString(privateKey.Decrypt(Convert.FromBase64String(cipherText.Substring(172)), false));
            var arr = result.Split(new string[] { "_^_" }, StringSplitOptions.None);
            var dataString = arr[0] + "_^_" + arr[1];

            var originalData = byteConverter.GetBytes(dataString);
            var signature = Convert.FromBase64String(arr[2]);
            return publicKey.VerifyData(originalData, SHA1.Create(), signature) ? dataString : "";
        }
    }


}