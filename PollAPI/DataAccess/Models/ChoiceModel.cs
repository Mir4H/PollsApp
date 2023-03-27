using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class ChoiceModel
    {
        public int Choice_id { get; set; }
        public string Text { get; set; } = "";
        public int Votes { get; set; } = 0;
        public int Poll_id { get; set; }
    }
}
