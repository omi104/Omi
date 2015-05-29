using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.Mergers
{
	public class StringMerger:IMerger<string,string,string>
	{
	    public string GetData()
	    {
	        return Input1 + Input2;
	    }

	    public string Input1 { set; private get; }
	    public string Input2 { set; private get; }
	}
}