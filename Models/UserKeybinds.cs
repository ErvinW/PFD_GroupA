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
		[StringLength(1, ErrorMessage = "Length cannot exceed 1 character")]
		public string TransferPage { get; set; }

		[Display(Name = "HomePage")]
		[StringLength(1, ErrorMessage = "Length cannot exceed 1 character")]
		public string HomePage { get; set; }


		[Display(Name = "LogoutFunc")]
		[StringLength(1, ErrorMessage = "Length cannot exceed 1 character")]
		public string LogoutFunc { get; set; }


	}
}
