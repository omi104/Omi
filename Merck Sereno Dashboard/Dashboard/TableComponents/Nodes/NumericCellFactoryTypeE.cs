using Dashboard.TableComponents.CellFactories;

namespace Dashboard.TableComponents.Nodes
{
    public class NumericCellFactoryTypeE : NumericCellFactory
    {

        public NumericCellFactoryTypeE()
            : base(format: "#,#0.0", suffix: "%", thousandSeparator: "'")
        {

        }

    }
}

