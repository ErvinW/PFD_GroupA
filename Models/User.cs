using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PFD_GroupA.Models
{
	public class User
	{

		[Display(Name = "ID")]
        [Required(ErrorMessage = "Account ID required")]
        [StringLength(50, ErrorMessage = "Length cannot exceed 50 characters")]
        public string id { get; set; }

		///

		[Required(ErrorMessage ="Account name required")]
		[StringLength(50, ErrorMessage ="Length cannot exceed 50 characters")]

        public string Name { get; set; }

		///

		[Display(Name = "PIN")]
		[Required(ErrorMessage = "Account pin required")]
		public string PIN {  get; set; }


		[Display(Name = "Account Number")]
		public double AccNo {  get; set; }

		

    }
}
