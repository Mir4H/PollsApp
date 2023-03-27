using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class PollModel
    {
        public int Poll_id { get; set; }
        public string Title { get; set; } = "";
        public DateTime Created_at { get; set; }
    }
}