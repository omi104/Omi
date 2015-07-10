using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;
using Component.Table;
using Component.Table.Functionalities;
using CubeFramework;
using Dashboard.Helper;
using Dashboard.Helper.Factory;
using Dashboard.TableComponents.RowFunctionalities;
using Dashboard.ViewModels;
using DashboardFramework.DataComponent;
using RowSpecificRankLevelFunctionality = Dashboard.Helper.RowSpecificRankLevelFunctionality;

namespace Dashboard.DataComponents.Transformers
{
    public class HierarchyTableTransfomer : ITransformer<CubeData, HierarchyTableConfig>
    {
        public bool ShowFullLength { get; set; }
        public string NameColumHeaderText { get; set; }
        public bool IsLowerTable { get; set; }
        public bool IsTopTable { get; set; }
        public string PeriodString { get; set; }
        public string MeasureValue { get; set; }
        public string AbsoluteTousandValue { get; set; }
        private int _isRbIndex = -1;
        private int _NameColIndex = -1;

        public virtual HierarchyTableConfig GetData()
        {
            var data = new HierarchyTableConfig { IsLowerTable = IsLowerTable, IsTopTable = IsTopTable };

            foreach (var col in Input.Columns.Where(col => col.Name.Contains("IS_MERCK")))
            {
                _isRbIndex = col.Position;
            }
            foreach (var col in Input.Columns.Where(col => col.Name.Contains("Name")))
            {
                _NameColIndex = col.Position;
            }
            var factory = new CubeTableFactory()
            {
                CellMaps = GetCellMap(Input.Columns),
                AutoCreateHeader = false,
                AutoCreateCellMaps = false,
                RowFunctionalities = new List<IRowFunctionality<Row>>()
                {
                    new LevelWiseRowColorFunctionaility(IsTopTable),
                    new RowSpecificRankLevelFunctionality(),
                    new AlternateRowColorFunctionality<Row>() { EvenColor = "#ffffff;", OddColor = "#fecefe" },
                    new HighlightRowIfRb() {colIndex = _isRbIndex},
                    new HoverValueAddRowFunctionality(IsLowerTable){CompanyTextColIndex = _NameColIndex,CompanyValueColIndex = Input.Columns.Last().Position}
                }
            };
            var table = factory.Create(Input);
            //table.Classes.Add("table");
            table.Classes.Add("snapshot-table-bordered");
            var header = new TableHeader();
            header.Rows.Add(FirstHeader(data));
            header.Rows.Add(SecondHeader());
            table.Header = header;
            table.Classes.Add(IsTopTable ? "top-table" : "bottom-table");
            if (ShowFullLength)
            {
                table.Classes.Add("LargeNameColTable");
            }
            data.Table = table;
            GetVarianceColumn(data, factory);
            return data;
        }


        protected virtual IEnumerable<CellMap<Row>> GetCellMap(IEnumerable<Column> columns)
        {
            throw new Exception("Cell mappping is not defined");
        }

        protected virtual TableRow FirstHeader(HierarchyTableConfig data)
        {
            var tr = new TableRow();
            tr.Classes.Add("firstHeaderRow");

            tr.Cells.Add(new SimpleNode("th", "Rank")
            {
                Attributes = new Dictionary<string, string>() { { "rowspan", "2" } },
                Classes = new List<string>() { "snapshot-top-rank" }
            });
            if (data.IsTopTable)
            {
                tr.Cells.Add(new SimpleNode("th", "Company")
                {
                    Attributes = new Dictionary<string, string>() { { "rowspan", "2" } },
                    Classes = new List<string>() { "snapshot-top-company" }
                });
                tr.Cells.Add(new SimpleNode("th", "Brand")
                {
                    Attributes = new Dictionary<string, string>() { { "rowspan", "2" } },
                    Classes = new List<string>() { "snapshot-top-brand" }
                });
            }
            else if (data.IsLowerTable)
            {
                tr.Cells.Add(new SimpleNode("th", NameColumHeaderText)
                {
                    Attributes = new Dictionary<string, string>() { { "rowspan", "2" } }
                });
            }

            if (Input.Columns.Count == 18 || Input.Columns.Count == 19)//toptable = 18, bottom table = 19
            {
                tr.Cells.Add(new SimpleNode("th", Input.Columns[3].Name.Split('_')[0]) { Attributes = new Dictionary<string, string>() { { "colspan", "2" } } });
                tr.Cells.Add(new SimpleNode("th", "") { Classes = new List<string>() { "BlankColHead" }, Attributes = new Dictionary<string, string>() { { "rowspan", "2" } } });
                tr.Cells.Add(new SimpleNode("th", Input.Columns[5].Name.Split('_')[0]) { Attributes = new Dictionary<string, string>() { { "colspan", "3" } } });
                tr.Cells.Add(new SimpleNode("th", "") { Classes = new List<string>() { "BlankColHead" }, Attributes = new Dictionary<string, string>() { { "rowspan", "2" } } });
                tr.Cells.Add(new SimpleNode("th", Input.Columns[11].Name.Split('_')[0]) { Attributes = new Dictionary<string, string>() { { "colspan", "3" } } });
            }
            else if (Input.Columns.Count == 16 || Input.Columns.Count == 17)
            {
                tr.Cells.Add(new SimpleNode("th", Input.Columns[3].Name.Split('_')[0]) { Attributes = new Dictionary<string, string>() { { "colspan", "3" } } });
                tr.Cells.Add(new SimpleNode("th", "") { Classes = new List<string>() { "BlankColHead" }, Attributes = new Dictionary<string, string>() { { "rowspan", "2" } } });
                tr.Cells.Add(new SimpleNode("th", Input.Columns[9].Name.Split('_')[0]) { Attributes = new Dictionary<string, string>() { { "colspan", "3" } } });
            }
            else if (Input.Columns.Count == 10 || Input.Columns.Count == 11)
                tr.Cells.Add(new SimpleNode("th", Input.Columns[3].Name.Split('_')[0]) { Attributes = new Dictionary<string, string>() { { "colspan", "3" } } });
            return tr;
        }

        protected virtual TableRow SecondHeader()
        {

            var tr = new TableRow();
            tr.Classes.Add("secondHeaderRow");
            if (Input.Columns.Count == 18 || Input.Columns.Count == 19)//toptable = 18, bottom table = 19
            {
                tr.Cells.Add(new SimpleNode("th", MeasureValue) { Classes = { "ComplexBlock", "block1Left", "head7" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
                tr.Cells.Add(new SimpleNode("th", "Share%*") { Classes = { "ComplexBlock", "block1Right", "head8" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });

                tr.Cells.Add(new SimpleNode("th", MeasureValue) { Classes = { "ComplexBlock", "block2Left", "head1" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
                tr.Cells.Add(new SimpleNode("th", "Share%*") { Classes = { "ComplexBlock", "head2" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
                tr.Cells.Add(new SimpleNode("th", "%Growth vs. PPYA*") { Classes = { "ComplexBlock", "block2Right", "head3" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });

                tr.Cells.Add(new SimpleNode("th", MeasureValue) { Classes = { "lastBlock", "ComplexBlock", "block3Left", "head4" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
                tr.Cells.Add(new SimpleNode("th", "Share%*") { Classes = { "lastBlock", "ComplexBlock", "head5" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
                tr.Cells.Add(new SimpleNode("th", "%Growth vs. PPYA*") { Classes = { "lastBlock", "ComplexBlock", "block3Right", "head6" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
            }
            else if (Input.Columns.Count == 16 || Input.Columns.Count == 17)
            {
                tr.Cells.Add(new SimpleNode("th", MeasureValue) { Classes = { "ComplexBlock", "block1Left", "head1" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
                tr.Cells.Add(new SimpleNode("th", "Share%*") { Classes = { "ComplexBlock", "head2" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
                tr.Cells.Add(new SimpleNode("th", "%Growth vs. PPYA*") { Classes = { "ComplexBlock", "block1Right", "head3" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });

                tr.Cells.Add(new SimpleNode("th", MeasureValue) { Classes = { "lastBlock", "ComplexBlock", "block2Left", "head4" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
                tr.Cells.Add(new SimpleNode("th", "Share%*") { Classes = { "lastBlock", "ComplexBlock", "head5" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
                tr.Cells.Add(new SimpleNode("th", "%Growth vs. PPYA*") { Classes = { "lastBlock", "ComplexBlock", "block2Right", "head6" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
            }
            else if (Input.Columns.Count == 10 || Input.Columns.Count == 11)
            {
                tr.Cells.Add(new SimpleNode("th", MeasureValue) { Classes = { "ComplexBlock", "block1Left", "head1" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
                tr.Cells.Add(new SimpleNode("th", "Share%*") { Classes = { "ComplexBlock", "head2" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
                tr.Cells.Add(new SimpleNode("th", "%Growth vs. PPYA*") { Classes = { "ComplexBlock", "block1Right", "head3" }, Attributes = new Dictionary<string, string>() { { "colspan", "1" } } });
            }
            return tr;
        }

        protected virtual void GetVarianceColumn(HierarchyTableConfig data, CubeTableFactory factory)
        {
            IEnumerable<ICellMap<Row>> barMaps = factory.CellMaps.Where(c => c.Columns.Contains("Change") || c.Columns.Contains("Growth"));
            var cellMaps = barMaps as IList<ICellMap<Row>> ?? barMaps.ToList();
            foreach (var cellMap in cellMaps.Take(cellMaps.Count()))
            {
                try
                {
                    var cellfactory = (CustomHorizontalBarFactory)cellMap.CellFactory;
                    double maxValue;
                    double.TryParse(cellfactory.Textformat.Format(cellfactory.MaxValue), out maxValue);
                    data.VarianceColumns.Add(cellfactory.Classes[1], maxValue);
                }
                catch (Exception ex)
                {
                    IMS.Logger.Logger.Fatal(ex.Message, ex);
                }

            }

        }
        public CubeData Input { set; private get; }
    }
}