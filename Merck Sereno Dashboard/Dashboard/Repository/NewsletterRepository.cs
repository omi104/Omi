using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using Dashboard.Configuration;
using Dashboard.Configurations.Constant;
using System.Net.Mail;
using Dashboard.Helper;
using Dashboard.IdentityModel.Entity;
using Dashboard.IdentityModel.Repositories;

// if not used, delete it
namespace Dashboard.Repository
{
    public class NewsletterRepository 
    {
        protected IReadOnlyDictionary<string, string> Parameters { get; set; }
        protected HttpServerUtilityBase MyHttpServerUtility { get; set; }
        protected HttpRequestBase MyRequest { get; set; }
        protected readonly UserAdminRepository UserAdminRepository = new UserAdminRepository();

        protected EmailRepository EmailRepository;
        public string MailFrom { get; set; }

        public NewsletterRepository(IReadOnlyDictionary<string, string> parameters, HttpServerUtilityBase httpServerUtility, HttpRequestBase request)
        {
            Parameters = parameters;
            MyHttpServerUtility = httpServerUtility;
            MyRequest = request;

            EmailRepository = new EmailRepository();
        }

        protected virtual void EmbedImage(string mailBody, string emailTemplateId, ApplicationUser user, MailMessage mailMessage)
        {
            //Embed images//

            Regex reImg = new Regex(@"<img\s[^>]*>", RegexOptions.IgnoreCase);
            Regex reSrc = new Regex(@"src=(?:(['""])(?<src>(?:(?!\1).)*)\1|(?<src>\S+))", RegexOptions.IgnoreCase | RegexOptions.Singleline);
            MatchCollection matchCollection = reImg.Matches(mailBody);

            foreach (Match match in matchCollection)
            {
                if (match.Groups[0].Value.Contains(Email.EmailReadReceiptToken))
                {
                    var queryString = "u=" + user.Id;
                    queryString += "&" + "t=" + emailTemplateId;
                    queryString += "&" + "d=" + DateTime.Now.ToString("MM-dd-yyyy");
                    queryString += "&" + "i=" + Guid.NewGuid();

                    var applicationUrl = MyRequest.UrlReferrer.OriginalString;
                    applicationUrl = String.Format("http://{0}{1}", MyRequest.UrlReferrer.Authority,MyRequest.UrlReferrer.AbsolutePath);

                    mailBody = mailBody.Replace(match.Groups[0].Value, "<img alt=\"image\" style=\"width:1px;height:1px;\" width=\"1\" height=\"1\" src=\"" + applicationUrl + Email.EmailReadReceiptToken + ".png" + "?" + queryString) + "\" />";
                    break;
                }
                string src = string.Empty;

                if (reSrc.IsMatch(mailBody))
                {
                    Match mSrc = reSrc.Match(match.Groups[0].Value);

                    src = mSrc.Groups["src"].Value;
                }

                string imagePath = src;

                string attachmentID = Path.GetFileName(imagePath).Replace(".", "") + "@jnj";

                try
                {
                    Attachment attachmentImage = new Attachment(MyHttpServerUtility.MapPath("~/" + imagePath));
                    attachmentImage.ContentDisposition.Inline = true;
                    attachmentImage.ContentId = attachmentID;
                    mailMessage.Attachments.Add(attachmentImage);

                    mailBody = mailBody.Replace(src, "cid:" + attachmentID);
                }
                catch (FileNotFoundException exception)
                {
                    IMS.Logger.Logger.Fatal(exception.Message, exception);
                    throw;
                }

            }
            mailMessage.Body = mailBody;
            //Embed images//
        }

        public virtual string SendNewsletterToSingleUser(string emailTemplateId, string email, string emailSubject, string body, string attachmentFile)
        {
            //DEBUG
            //var debugHelper = new EmailDebugHelper();
            //if (debugHelper.IsBlockedEmail(email))
            //{
            //    return "User is not in allowed list";
            //}
            ////DEBUG

            var user = UserAdminRepository.GetUserByEmail(email);
            if (user == null)
            {
                return Email.UserNotFound;
            }

            

            var mailSubject = emailSubject;
            var isBodyHtml = true;
            var mailBody = body;

            mailBody = mailBody.Replace(Email.UserId, user.Id)
                                .Replace(Email.FirstName, user.FirstName)
                                .Replace(Email.LastName, user.LastName)
                                .Replace(Email.Password, ConfigurationManager.AppSettings[Email.DefaultPassword])
                                .Replace(Email.EmailAddress, user.Email);

            var mailMessage = new MailMessage(MailFrom, email);

            //Embed images//
            EmbedImage(mailBody, emailTemplateId, user, mailMessage);
            //Embed images//

            mailMessage.Subject = mailSubject;
            mailMessage.IsBodyHtml = isBodyHtml;


            if (!string.IsNullOrEmpty(attachmentFile))
            {
                var attachment = new Attachment(MyHttpServerUtility.MapPath("~/" + attachmentFile));
                attachment.Name = attachmentFile;
                mailMessage.Attachments.Add(attachment);
            }

            try
            {
                EmailRepository.SendMail(mailMessage);
            }
            catch (Exception exception)
            {
                IMS.Logger.Logger.Fatal(exception.Message, exception);
                return exception.Message;
            }
            return Email.Success;
        }

        public virtual string SendNewsletterToManyUser(string templateId, string emails, string emailSubject, string strHtml)
        {
            string message = string.Empty;

            strHtml = strHtml.ReplaceEncodedHtmlTag();

            var arrEmailTO = emails.Split(';');

            const string userNamePhrase = Email.ClientFirstName;

            var userList = UserAdminRepository.GetActiveUsers();
            var baseStrHtml = string.Empty;

            int sentMessageCount = 0;
            int sentMessageSuccessCount = 0;
            int sentMessageFailCount = 0;

            if (strHtml.Contains(userNamePhrase))
                baseStrHtml = strHtml;
            for (int i = 0; i < arrEmailTO.Length; i++)
            {
                if (arrEmailTO[i] != string.Empty)
                {
                    if (baseStrHtml.Contains(userNamePhrase))
                    {
                        foreach (var user in userList)
                        {
                            if (user.Email == arrEmailTO[i])
                            {
                                var userName = user.FirstName;
                                if (string.IsNullOrEmpty(userName))
                                    userName = Email.BlankUserName;
                                strHtml = baseStrHtml.Replace(userNamePhrase, userName);
                                break;
                            }
                        }
                    }
                    string individualMailResult = arrEmailTO[i] + ":";

                    string snapshotImage = null;
                    //if (Parameters[Params.Admin.SnapshotFactor] == Constant.Email.Keys.All ||
                    //    Parameters[Params.Admin.SnapshotFactor] == Constant.Email.Keys.Attachment)
                    //{
                    //    snapshotImage = Parameters[Params.Admin.SnapshotImageName];
                    //}

                    var sucessOrFail = SendNewsletterToSingleUser(templateId, arrEmailTO[i], emailSubject, strHtml, snapshotImage);
                    if (sucessOrFail == Email.Success)
                    {
                        sentMessageSuccessCount++;
                    }
                    else
                    {
                        sentMessageFailCount++;
                    }
                    sentMessageCount++;

                    //individualMailResult += sucessOrFail;
                    //message += "<br />" + individualMailResult + ",";

                }
            }

            message = message.TrimEnd(new char[] { ',' });
            message = sentMessageCount + " message(s) sent.<br /> Success " + sentMessageSuccessCount + ".<br /> Fail " + sentMessageFailCount + message;
            return message;
        }

        //public string SendResetPasswordToSingleUser(string emailTemplateId, string emailSubject, string url, ApplicationUser user)
        //{

        //    var mailFrom = ConfigurationManager.AppSettings[Email.PasswordResetMailFrom];
        //    var mailSubject = ConfigurationManager.AppSettings["PasswordResetMailSubject"].Replace("$action$", "Password reset");
        //    var isBodyHtml = bool.Parse(ConfigurationManager.AppSettings["PasswordResetIsMailBodyHTML"]);
        //    var mailBody = ConfigurationManager.AppSettings["PasswordResetMailBody"];

        //    mailBody = mailBody.Replace("$URL$", url);


        //    mailBody = mailBody.Replace("$user_id$", user.Id);
        //    mailBody = mailBody.Replace("$first_name$", user.FirstName);
        //    mailBody = mailBody.Replace("$last_name$", user.LastName);
        //    mailBody = mailBody.Replace("$PASSWORD$", user.);
        //    mailBody = mailBody.Replace("$EMAIL$", user.Email);


        //    var mailMessage = new MailMessage(mailFrom, user.Email);
        //    mailMessage.Subject = mailSubject;
        //    mailMessage.Body = mailBody;
        //    mailMessage.IsBodyHtml = isBodyHtml;

        //    //Embed images//
        //    EmbedImage(mailBody, emailTemplateId, user, mailMessage);
        //    //Embed images//

        //    mailMessage.Subject = mailSubject;
        //    mailMessage.IsBodyHtml = isBodyHtml;
        //    //Embed images//

        //    try
        //    {
        //        EmailRepository.SendMail(mailMessage);
        //    }
        //    catch (Exception exception)
        //    {
        //        IMS.Logger.Logger.Fatal(exception.Message, exception);
        //        return exception.Message;
        //    }
        //    return Constant.Email.Keys.Success;
        //}

        //public string SendForgetPasswordMailToSingleUser(string url, User user)
        //{
        //    var mailFrom = ConfigurationManager.AppSettings[Constant.Email.Keys.PasswordResetMailFrom];
        //    var mailSubject = ConfigurationManager.AppSettings["PasswordResetMailSubject"].Replace("$action$", "Password reset");
        //    var isBodyHtml = bool.Parse(ConfigurationManager.AppSettings["PasswordResetIsMailBodyHTML"]);
        //    var mailBody = ConfigurationManager.AppSettings["ForgetPasswordMailBody"];

        //    int index2 = url.LastIndexOf('=');
        //    var urlLength = url.Length;
        //    if (index2 != -1 && index2 == (urlLength - 1))
        //    {
        //        url = url.Substring(0, urlLength - 1);
        //    }

        //    mailBody = mailBody.Replace("$URL$", url);


        //    mailBody = mailBody.Replace("$user_id$", user.UserId);
        //    mailBody = mailBody.Replace("$first_name$", user.FirstName);
        //    mailBody = mailBody.Replace("$last_name$", user.LastName);
        //    mailBody = mailBody.Replace("$PASSWORD$", user.Password);
        //    mailBody = mailBody.Replace("$EMAIL$", user.Email);


        //    var mailMessage = new MailMessage(mailFrom, user.Email);
        //    mailMessage.Subject = mailSubject;
        //    mailMessage.Body = mailBody;
        //    mailMessage.IsBodyHtml = isBodyHtml;

        //    //Embed images//
        //    EmbedImage(mailBody, "-1", user, mailMessage);
        //    //Embed images//

        //    mailMessage.Subject = mailSubject;
        //    mailMessage.IsBodyHtml = isBodyHtml;
        //    //Embed images//

        //    try
        //    {
        //        EmailRepository.SendMail(mailMessage);
        //    }
        //    catch (Exception exception)
        //    {
        //        IMS.Logger.Logger.Fatal(exception.Message, exception);
        //        return exception.Message;
        //    }
        //    return Constant.Email.Keys.Success;
        //}

        //public string SendUserCreationMailToSingleUser(string url, User user)
        //{
        //    var applicationText = new ApplicationTextRepository();
        //    var emailTemplateRepository = new EmailTemplateRepository();
            

        //    var mailFrom = applicationText.GetText(Constant.Email.Keys.UserCreationMailFrom);
        //    var mailSubject = applicationText.GetText(Constant.Email.Keys.UserCreationMailSubject);
        //    var isBodyHtml = true;
        //    var emailtemplateId = applicationText.GetText(Constant.Email.Keys.UserCreationMailBody);
        //    var mailtemplates = emailTemplateRepository.GetEmailTemplate(int.Parse(emailtemplateId));
        //    var mailBody = string.Empty;
        //    if (mailtemplates.Count > 0)
        //    {
        //        mailBody = emailTemplateRepository.GetEmailTemplate(int.Parse(emailtemplateId)).FirstOrDefault().Content;
        //    }
        //    else
        //    {
        //        string message = "Email template not defined for user creation. Expected email template = " +emailtemplateId;
        //        IMS.Logger.Logger.Fatal(message);
        //        return message;
        //    }

        //    mailBody = mailBody.ReplaceEncodedHtmlTag();

        //    mailBody = mailBody.Replace("$URL$", url);


        //    mailBody = mailBody.Replace("$user_id$", user.UserId);
        //    mailBody = mailBody.Replace("$first_name$", user.FirstName);
        //    mailBody = mailBody.Replace("$last_name$", user.LastName);
        //    mailBody = mailBody.Replace("$PASSWORD$", user.Password);
        //    mailBody = mailBody.Replace("$EMAIL$", user.Email);


        //    var mailMessage = new MailMessage(mailFrom, user.Email);
        //    mailMessage.Subject = mailSubject;
        //    mailMessage.Body = mailBody;
        //    mailMessage.IsBodyHtml = isBodyHtml;

        //    //Embed images//
        //    EmbedImage(mailBody, "-1", user, mailMessage);
        //    //Embed images//

        //    mailMessage.Subject = mailSubject;
        //    mailMessage.IsBodyHtml = isBodyHtml;

        //    try
        //    {
        //        EmailRepository.SendMail(mailMessage);
        //    }
        //    catch (Exception exception)
        //    {
        //        IMS.Logger.Logger.Fatal(exception.Message, exception);
        //        return exception.Message;
        //    }
        //    return Constant.Email.Keys.Success;
        //}
    }
}
