using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace PFD_GroupA.Models
{
    public class Transactions
    {
        [Display(Name = "SenderAccount")]
        public string SenderAccount { get; set; }

        [Display(Name = "RecipientAccount")]
        public string RecipientAccount { get; set; }

        [Display(Name = "AmountSent")]
        public SqlMoney AmountSent { get; set; }


        [Display(Name = "TransactionDate")]
        public DateTime TransactionDate { get; set; }
    }
}
