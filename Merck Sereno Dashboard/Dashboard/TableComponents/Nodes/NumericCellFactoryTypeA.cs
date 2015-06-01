using Dashboard.TableComponents.CellFactories;

namespace Dashboard.TableComponents.Nodes
{
    public class NumericCellFactoryTypeA : JnjIndicatorCellFactory
    {

        public NumericCellFactoryTypeA()
            : base(format: "#,#0.0", suffix: "%", thousandSeparator: "'")
        {

        }

    }
}

