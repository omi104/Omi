namespace Dashboard.Helper
{
    public class ApplicationHelper
    {

        public string GetNavigationOnChangeAction(string navigationName, bool isFromLandingPage)
        {
            return string.Format("CommandCenter.navigationChanged('{0}')", navigationName);
        }


    }


}