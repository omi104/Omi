using Component.Node;

namespace Dashboard.TableComponents.CellFactories
{
    public class NumericCellFactory : NumericExtendedFactory
    {

        public NumericCellFactory(string format = null, string prefix = null, string suffix = null, string thousandSeparator = ",", double scaleBy = 1)
            :base(format,prefix,suffix,thousandSeparator,scaleBy)
        {
        }

        public override INode Create(object value)
        {
            var cell = new ComplexNode("td");
            cell.Classes.Add("col-" + ColumnPosition);
            cell.ChildNodes.Add(GetNumeric(value));

            AddHoverAction(cell);

            return cell;

        }

        protected virtual INode GetNumeric(object value)
        {
            return new NumericExtendedFactory(Format, Prefix, Suffix, ThousandSeparator,ScaleBy).Create((value));
        }

        protected virtual void AddHoverAction(ComplexNode complexNode)
        {
            ;
        }

    }
}

