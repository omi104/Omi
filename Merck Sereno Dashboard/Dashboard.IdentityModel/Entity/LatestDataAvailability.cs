using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dashboard.IdentityModel.Entity
{
    public class LatestDataAvailability
    {
        [Key]
        public DateTime DATA_UPDATED_ON { get; set; }

        public string UPDATED_ON { get; set; }

        public string SOURCE { get; set; }

        public string AVAILABLE_DATA { get; set; }


    }
}
