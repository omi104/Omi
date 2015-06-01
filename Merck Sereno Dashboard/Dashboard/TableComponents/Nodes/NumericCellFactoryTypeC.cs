using Dashboard.TableComponents.CellFactories;

namespace Dashboard.TableComponents.Nodes
{
    public class NumericCellFactoryTypeC : JnjIndicatorCellFactory
    {

        public NumericCellFactoryTypeC()
            : base(format: "#,#0", thousandSeparator: "'", scaleBy:1000)
        {
            
        }

    }
}

