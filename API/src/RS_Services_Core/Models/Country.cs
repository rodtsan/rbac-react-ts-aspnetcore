using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RS_Services_Core.Models
{
	public class Country
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string CountryCode { get; set; }
		public string AreaCode { get; set; }
	}

	public class State
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string StateCode { get; set; }
		public string AreaCode { get; set; }
	}
}
