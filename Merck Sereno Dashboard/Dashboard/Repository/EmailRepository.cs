using System.Net.Mail;

namespace Dashboard.Repository
{
    public class EmailRepository 
    {
        public void SendMail(MailMessage mailMessage)
        {
            var smtp = new SmtpClient();
            smtp.Send(mailMessage);
        }
    }
}
