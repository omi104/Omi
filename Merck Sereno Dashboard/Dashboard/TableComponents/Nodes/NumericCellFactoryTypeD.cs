using Dashboard.TableComponents.CellFactories;

namespace Dashboard.TableComponents.Nodes
{
    public class NumericCellFactoryTypeD : NumericCellFactory
    {

        public NumericCellFactoryTypeD()
            : base(format: "#,#0", thousandSeparator: "'", scaleBy: 1000)
        {
            
        }

    }
}

