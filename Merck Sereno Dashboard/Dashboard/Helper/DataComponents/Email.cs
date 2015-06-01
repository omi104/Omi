using System;
using System.Collections;
using System.IO;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using IMS.Logger;

namespace Dashboard.DataComponents.Helper
{
    public class EMail
    {
        private static readonly ArrayList mailMessages = new ArrayList();
        private static readonly object syncObjct = new object();
        private static bool _processRunning;
        private static bool _shouldStop;

        public static void SendMail(MailMessage mailMessage, bool startSend = true)
        {
            mailMessages.Add(mailMessage);
            if (startSend) StartProcess();
        }

        public string SendMail(string from, string to, string subject, string body, System.IO.Stream content, bool startSend = true, string exporFileName = "Exported")
        {
            MailMessage mailMessage = new MailMessage(from, to)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            mailMessage.IsBodyHtml = false;
            if (content != null)
                mailMessage.Attachments.Add(new Attachment(content, exporFileName+".pdf"));

            return SendMail(mailMessage);
        }
        private string SendMail(MailMessage mailMessage)
        {
            var smtp = new SmtpClient();
            smtp.Send(mailMessage);
            return "Success";
        }
        public static void SendMail(string from, string to, string subject, string body, bool startSend = true)
        {
            try
            {
                var mailMessage = new MailMessage(from, to)
                {
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };
                EmbedInlineImage(mailMessage, HttpContext.Current.Server);
                mailMessages.Add(mailMessage);
                if (startSend) StartProcess();
            }
            catch (Exception e)
            {
                Logger.Error(e.Message);
                throw new Exception("Send EMail faced an error.", e);
            }
        }

        private static void StartProcess()
        {
            try
            {
                if (!_processRunning)
                {
                    lock (syncObjct)
                    {
                        if (!_processRunning)
                            _processRunning = true;
                        else
                            return;
                    }

                    var smtp = new SmtpClient();
                    while (mailMessages.Count > 0)
                    {
                        if (_shouldStop)
                            break;
                        try
                        {
                            smtp.Send((MailMessage) mailMessages[0]);
                        }
                        catch (Exception ex)
                        {
                            throw new Exception("Mail was not send.",ex);
                        }
                        finally
                        {
                            mailMessages.RemoveAt(0);
                        }
                    }
                    smtp.Dispose();

                    _shouldStop = false;
                    _processRunning = false;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Mail was not send.", ex);
            }
        }

        public static void Start()
        {
            // Start the worker thread.
            if (!InProgress())
            {
                var workerThread = new Thread(StartProcess);
                workerThread.Start();
            }
        }

        public static void Stop()
        {
            _shouldStop = true;
        }

        public static bool InProgress()
        {
            return _processRunning;
        }

        public static bool IsEmail(string email)
        {
            if (email == null) return false;

            string regex =
                @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";

            var re = new Regex(regex);
            if (re.IsMatch(email))
                return true;

            return false;
        }

        private static void EmbedInlineImage(MailMessage mailMessage, HttpServerUtility httpServerUtility)
        {
            //Embed images//

            var mailBody = mailMessage.Body;

            Regex reImg = new Regex(@"<img\s[^>]*>", RegexOptions.IgnoreCase);
            Regex reSrc = new Regex(@"src=(?:(['""])(?<src>(?:(?!\1).)*)\1|(?<src>\S+))", RegexOptions.IgnoreCase | RegexOptions.Singleline);
            MatchCollection matchCollection = reImg.Matches(mailBody);

            mailMessage.IsBodyHtml = true;

            foreach (Match match in matchCollection)
            {
                
                string src = string.Empty;

                if (reSrc.IsMatch(mailBody))
                {
                    Match mSrc = reSrc.Match(match.Groups[0].Value);

                    src = mSrc.Groups["src"].Value;
                }

                string imagePath = src;
                string attachmentId = Path.GetFileName(imagePath);

                var attachmentImage = new Attachment(httpServerUtility.MapPath("~/" + imagePath));
                attachmentImage.ContentDisposition.Inline = true;
                attachmentImage.ContentId = attachmentId;
                mailMessage.Attachments.Add(attachmentImage);

                mailBody = mailBody.Replace(src, "cid:" + attachmentId);

            }
            mailMessage.Body = mailBody;
            //Embed images//
        }
    }
}