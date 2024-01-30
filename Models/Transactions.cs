using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;

namespace PFD_GroupA.Models
{
    public class Transactions
    {
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Display(Name = "TransactionID")]
		public int TransactionID { get; set; }

        [Display(Name = "SenderAccount")]
        public string SenderAccount { get; set; }

        [Display(Name = "RecipientAccount")]
        public string RecipientAccount { get; set; }

        [Display(Name = "AmountSent")]
        public decimal AmountSent { get; set; }

        /*public string FormattedAmount
        {
            get
            {
                return AmountSent.ToDecimal().ToString("C");
            }
        }*/


        [Display(Name = "Category")]
        public string Category { get; set; }

        [Display(Name = "TransactionDate")]
        public DateTime TransactionDate { get; set; }
    }
}
