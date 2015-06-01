using System.Web.Mvc;
using Dashboard.Repository;


namespace Dashboard.Controllers
{
    public class FileDownloadController : Controller
    {
        private readonly DocumentRepository _documentRepository;

        public FileDownloadController()
        {
            _documentRepository = new DocumentRepository();
        }

     
        public ActionResult DownloadFile(Document document)
        {
            var downloadableDocument = _documentRepository.GetDownloadableDocument(document);
            return File(downloadableDocument.Content, downloadableDocument.ContentType, downloadableDocument.FileName);
        }
    }
    
}
