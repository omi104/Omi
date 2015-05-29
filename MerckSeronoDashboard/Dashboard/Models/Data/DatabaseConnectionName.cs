using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.Models.Data
{
    public class DatabaseConnectionName
    {
        public int Database_Name_ID { get; set; }

        public string Key { get; set; }

        public string Value { get; set; }

        public bool IsUsed { get; set; }
    }
}