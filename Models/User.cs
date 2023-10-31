using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PFD_GroupA.Models
{
	public class User
	{

		[Display(Name = "UserID")]
        [Required(ErrorMessage = "Account ID required")]
        [StringLength(50, ErrorMessage = "Length cannot exceed 50 characters")]
        public string UserID { get; set; }

		///
		[Display(Name= "UserName")]
		[Required(ErrorMessage ="Account name required")]
		[StringLength(50, ErrorMessage ="Length cannot exceed 50 characters")]

        public string UserName { get; set; }

		///

		[Display(Name = "PinNum")]
		[Required(ErrorMessage = "Account pin required")]
		public string PinNum {  get; set; }


		

		

    }
}
