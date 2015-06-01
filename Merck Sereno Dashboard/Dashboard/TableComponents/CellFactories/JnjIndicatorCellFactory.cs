

using System.Collections.Generic;
using Component.Node;
using Dashboard.Helper.Factory;

namespace Dashboard.TableComponents.CellFactories
{
    public class JnjIndicatorCellFactory : NumericCellFactory
    {

        public JnjIndicatorCellFactory(string format = null, string prefix = null, string suffix = null, string thousandSeparator = ",", double scaleBy = 1)
            :base(format,prefix,suffix,thousandSeparator,scaleBy)
        {
            
        }

        public override INode Create(object value)
        {
            var cell = new ComplexNode("td");
            cell.Classes.Add("col-" + ColumnPosition);

            var values = value as List<string>;

            cell.ChildNodes.Add(GetNumeric(value));

            if (value != null && values != null && values.Count > 1)
            {
                if (values[0] != "--")
                {
                    cell.ChildNodes.Add(GetIndicator(value));
                    cell.Classes.Add("has-indicator");
                }
            }

            AddHoverAction(cell);

            return cell;

        }

        protected override INode GetNumeric(object value)
        {
            var values = value as List<string>;
            return new NumericExtendedFactory(Format, Prefix, Suffix, ThousandSeparator,ScaleBy).Create((values[0]));
        }

        protected virtual INode GetIndicator(object value)
        {
            var values = value as List<string>;
            string indicator = values[1];
            return new JnjIndicatorCellFactory().Create(indicator);
        }

    }
}