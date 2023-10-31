using System.ComponentModel.DataAnnotations;

namespace PFD_GroupA.Models
{
	public class User
	{

		[Display(Name = "ID")]
		public string id { get; set; }

		[Required(ErrorMessage ="Account name required")]
		[StringLength(50, ErrorMessage ="Length cannot exceed 50 characters")]

        public string Name { get; set; }

		[Required(ErrorMessage ="Account pin required")]
		[StringLength(50, ErrorMessage ="Length cannot exceed 50 characters")]
		public string PIN {  get; set; }


		[Display(Name = "Account Number")]
		public double AccNo {  get; set; }

		

    }
}
