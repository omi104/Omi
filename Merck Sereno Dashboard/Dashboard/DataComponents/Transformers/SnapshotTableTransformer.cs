using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Table;
using CubeFramework;
using Dashboard.Helper.Factory;
using Dashboard.TableComponents.CellDataProvider;
using Dashboard.TableComponents.CellFactories;
using TextCellFactory = Dashboard.Helper.Factory.TextCellFactory;

namespace Dashboard.DataComponents.Transformers
{
    public class SnapshotTableTransformer : HierarchyTableTransfomer
    {
        protected override IEnumerable<CellMap<Row>> GetCellMap(IEnumerable<Column> columns)
        {
            var list = new List<CellMap<Row>>();
            var cubeColumns = columns as IList<Column> ?? columns.ToList();

            if (IsTopTable)
            {
                list.Add(new CellMap<Row> { CellFactory = new TextCellFactory() { Classes = new List<string>() { "snapshot-top-rank" } }, RowCellDataProvider = new CubeCellDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[0].Name } });
                list.Add(new CellMap<Row> { CellFactory = new TextCellFactory() { Classes = new List<string>() { "snapshot-top-company" } }, RowCellDataProvider = new CubeCellDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[1].Name } });
                list.Add(new CellMap<Row> { CellFactory = new TextCellFactory() { IsMakeTextShort = false, Classes = new List<string>() { "snapshot-top-brand" } }, RowCellDataProvider = new CubeCellDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[2].Name } });
            }
            else
            {
                list.Add(new CellMap<Row> { CellFactory = new ColorfulDivCellFactory() { Classes = new List<string>() { "snapshot-bottom-rank" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string>() { cubeColumns[0].Name, cubeColumns[1].Name } });
                list.Add(new CellMap<Row> { CellFactory = new TextCellFactory() { NameCollength = ShowFullLength ? 999 : 16, IsMakeTextShort = false, Classes = new List<string>() { "col-1", "snapshot-bottom-company" } }, RowCellDataProvider = new CubeCellDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[1].Name } });
            }

            if (cubeColumns.Count == 18 || cubeColumns.Count == 19)//toptable = 18, bottom table = 19
            {
                list.Add(new CellMap<Row> { CellFactory = new NumberDecimalWithoutArrowIndicatorCellFactory(colId: 3, nodeName: "td") { Classes = new List<string>() { !IsTopTable ? "hoverable" : "" }, NumberFormatString = AbsoluteTousandValue == "Thousand" ? "#,###," : "#,#0", Suffix = AbsoluteTousandValue == "Thousand" ? "k" : string.Empty }, RowCellDataProvider = new CubeCellDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[3].Name } });
                list.Add(new CellMap<Row> { CellFactory = new NumberDecimalCellFactory() { colId = 4, Classes = new List<string>() { "col-4", !IsTopTable ? "hoverable" : "" } }, RowCellDataProvider = new CubeCellDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[4].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new BlankTableCellFactory() { Classes = new List<string>() { "BlankCol" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string>() { cubeColumns[3].Name, cubeColumns[4].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 5, nodeName: "td") { Classes = new List<string>() { "value-retail", !IsTopTable ? "hoverable" : "" }, NumberFormatString = AbsoluteTousandValue == "Thousand" ? "#,###," : "#,#0", Suffix = AbsoluteTousandValue == "Thousand" ? "k" : string.Empty }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string>() { cubeColumns[5].Name, cubeColumns[6].Name } });
                list.Add(new CellMap<Row> { CellFactory = new IndicatorCellFactory() { colId = 6, Classes = new List<string>() { "col-6", "share", !IsTopTable ? "hoverable" : "" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[7].Name, cubeColumns[8].Name } });
                list.Add(new CellMap<Row> { CellFactory = new IndicatorCellFactory() { colId = 7, Classes = new List<string>() { "col-7", "growth-vs-ppya", !IsTopTable ? "hoverable" : "" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[9].Name, cubeColumns[10].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new BlankTableCellFactory() { Classes = new List<string>() { "BlankCol" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string>() { cubeColumns[3].Name, cubeColumns[4].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 8, nodeName: "td") { Classes = new List<string>() { "value-retail", !IsTopTable ? "hoverable" : "" }, NumberFormatString = AbsoluteTousandValue == "Thousand" ? "#,###," : "#,#0", Suffix = AbsoluteTousandValue == "Thousand" ? "k" : string.Empty }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string>() { cubeColumns[11].Name, cubeColumns[12].Name } });
                list.Add(new CellMap<Row> { CellFactory = new IndicatorCellFactory() { colId = 9, Classes = new List<string>() { "col-9", "share", !IsTopTable ? "hoverable" : "" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[13].Name, cubeColumns[14].Name } });
                list.Add(new CellMap<Row> { CellFactory = new IndicatorCellFactory() { colId = 10, Classes = new List<string>() { "col-10", "growth-vs-ppya", !IsTopTable ? "hoverable" : "" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[15].Name, cubeColumns[16].Name } });
            }
            else if (cubeColumns.Count == 16 || cubeColumns.Count == 17)
            {
                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 5, nodeName: "td") { Classes = new List<string>() { "value-retail", !IsTopTable ? "hoverable" : "" }, NumberFormatString = AbsoluteTousandValue == "Thousand" ? "#,###," : "#,#0", Suffix = AbsoluteTousandValue == "Thousand" ? "k" : string.Empty }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string>() { cubeColumns[3].Name, cubeColumns[4].Name } });
                list.Add(new CellMap<Row> { CellFactory = new IndicatorCellFactory() { colId = 6, Classes = new List<string>() { "col-7", "share", !IsTopTable ? "hoverable" : "" }, }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[5].Name, cubeColumns[6].Name } });
                list.Add(new CellMap<Row> { CellFactory = new IndicatorCellFactory() { colId = 7, Classes = new List<string>() { "col-8", "growth-vs-ppya", !IsTopTable ? "hoverable" : "" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[7].Name, cubeColumns[8].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new BlankTableCellFactory() { Classes = new List<string>() { "BlankCol" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string>() { cubeColumns[3].Name, cubeColumns[4].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 8, nodeName: "td") { Classes = new List<string>() { "value-retail", !IsTopTable ? "hoverable" : "" }, NumberFormatString = AbsoluteTousandValue == "Thousand" ? "#,###," : "#,#0", Suffix = AbsoluteTousandValue == "Thousand" ? "k" : string.Empty }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string>() { cubeColumns[9].Name, cubeColumns[10].Name } });
                list.Add(new CellMap<Row> { CellFactory = new IndicatorCellFactory() { colId = 9, Classes = new List<string>() { "col-9", "share", !IsTopTable ? "hoverable" : "" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[11].Name, cubeColumns[12].Name } });
                list.Add(new CellMap<Row> { CellFactory = new IndicatorCellFactory() { colId = 10, Classes = new List<string>() { "col-10", "growth-vs-ppya", !IsTopTable ? "hoverable" : "" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[13].Name, cubeColumns[14].Name } });
            }
            else if (cubeColumns.Count == 10 || cubeColumns.Count == 11)
            {
                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 8, nodeName: "td") { Classes = new List<string>() { "value-retail", !IsTopTable ? "hoverable" : "" }, NumberFormatString = AbsoluteTousandValue == "Thousand" ? "#,###," : "#,#0", Suffix = AbsoluteTousandValue == "Thousand" ? "k" : string.Empty }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string>() { cubeColumns[3].Name, cubeColumns[4].Name } });
                list.Add(new CellMap<Row> { CellFactory = new IndicatorCellFactory() { colId = 9, Classes = new List<string>() { "col-9", "share", !IsTopTable ? "hoverable" : "" }, }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[5].Name, cubeColumns[6].Name } });
                list.Add(new CellMap<Row> { CellFactory = new IndicatorCellFactory() { colId = 10, Classes = new List<string>() { "col-10", "growth-vs-ppya", !IsTopTable ? "hoverable" : "" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(cubeColumns), Columns = new List<string> { cubeColumns[7].Name, cubeColumns[8].Name } });
            }
            return list;
        }
    }
}