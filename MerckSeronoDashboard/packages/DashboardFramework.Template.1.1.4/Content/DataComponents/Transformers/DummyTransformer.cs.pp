using System.Collections.Generic;
using DashboardFramework.DataComponent;
using $rootnamespace$.Models.Data;

namespace $rootnamespace$.DataComponents.Transformers
{
    public class DummyTransformer : ITransformer<List<string>, List<DummyWidgetData>>
    {
        public List<string> Input
        {
            get;
            set;
        }

        public List<DummyWidgetData> GetData()
        {
            var data = new List<DummyWidgetData>();
            foreach (var s in Input)
            {
                var splits = s.Split(new[] { '|' });
                data.Add(new DummyWidgetData()
                         {
                             Col1 = splits[0],
                             Col2 = splits[1],
                             Col3 = splits[2],
                             Col4 = splits[3],
                         });
            }

            return data;
        }
    }
}