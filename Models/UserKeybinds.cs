using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PFD_GroupA.Models
{
	public class UserKeybinds
	{
		[Display(Name = "UserID")]
		[Required(ErrorMessage = "Account ID required")]
		[StringLength(50, ErrorMessage = "Length cannot exceed 50 characters")]
		public string UserID { get; set; }


		[Display(Name = "TransferPage")]
		[StringLength(3, ErrorMessage = "Length cannot exceed 1 character")]
		public string TransferPage { get; set; }

		[Display(Name = "HomePage")]
		[StringLength(3, ErrorMessage = "Length cannot exceed 1 character")]
		public string HomePage { get; set; }


		[Display(Name = "LogoutFunc")]
		[StringLength(3, ErrorMessage = "Length cannot exceed 1 character")]
		public string LogoutFunc { get; set; }



		[Display(Name = "AccountPage")]
		[StringLength(3, ErrorMessage = "Length cannot exceed 1 character")]
		public string AccountPage { get; set; }

		[Display(Name = "Cards")]
		[StringLength(3, ErrorMessage = "Length cannot exceed 1 character")]
		public string Cards { get; set; }


		[Display(Name = "Settings")]
		[StringLength(3, ErrorMessage = "Length cannot exceed 1 character")]
		public string Settings { get; set; }

		[Display(Name = "Help")]
		[StringLength(3, ErrorMessage = "Length cannot exceed 1 character")]
		public string Help { get; set; }

		[Display(Name = "Keybind")]
		[StringLength(3, ErrorMessage = "Length cannot exceed 1 character")]
		public string Keybind { get; set; }
	}
}
