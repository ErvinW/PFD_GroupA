using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;
using System.Xml.Linq;

namespace PFD_GroupA.Models
{
	public class Keybind
	{
		[Display(Name = "UserID")]
		public string UserID { get; set; }

		[Display(Name = "KeybindPage")]
		public string KeybindPage { get; set; }

		[Display(Name = "Keys")]
		public string Keys { get; set; }
	}
}
