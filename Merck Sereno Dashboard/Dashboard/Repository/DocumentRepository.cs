using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;


namespace Dashboard.Repository
{
    public class DocumentRepository
    {
        private static string _downloadableRoot = HttpContext.Current.Server.MapPath("~/Content/Downloadable");

        public DocumentRepository()
        {
            var path = System.Configuration.ConfigurationManager.AppSettings["DownloadabalePath"];
            if (!string.IsNullOrEmpty(path))
            {
                _downloadableRoot = HttpContext.Current.Server.MapPath(path);
            }
        }

        public DownloadableDocument GetDownloadableDocument(Document document)
        {
            var filepath = _downloadableRoot + document.Filename;

            var content = File.ReadAllBytes(filepath);
            var contentType = FileContentManager.GetFileContentType(document.Extension);

            var regex = new Regex("[^a-zA-Z0-9_. ]");
            var downloadFileName = regex.Replace(document.Filename, string.Empty);

            return new DownloadableDocument { Content = content, ContentType = contentType, FileName = downloadFileName };
        }
    }

    public class DownloadableDocument
    {
        public byte[] Content { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
    }

    public class Document
    {
        public string Filename { get; set; }
        public string FolderName { get; set; }
        public string Extension { get; set; }
        public DateTime LastUpdateTime { get; set; }
        public long FileSizeInBytes { get; set; }

        public Document(string folderName, string filePath)
        {
            FolderName = folderName;

            var fileInfo = new FileInfo(filePath);
            Filename = fileInfo.Name;
            Extension = fileInfo.Extension.TrimStart('.').ToLower();
            LastUpdateTime = fileInfo.LastWriteTime;
            FileSizeInBytes = fileInfo.Length;
        }

        public Document()
        {

        }
    }

    public class FileContentManager
    {
        public static string GetFileContentType(string fileExtension)
        {
            string contentType = "application/octetstream";
            switch (fileExtension)
            {
                case "xls": contentType = "application/vnd.ms-excel"; break;
                case "ppt":
                case "pptx": contentType = "application/vnd.ms-powerpoint"; break;
                case "pdf": contentType = "APPLICATION/X-PDF"; break;
                case "jpg": contentType = "image/jpeg"; break;
            }
            return contentType;
        }
    }
}
