using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;

namespace PFD_GroupA.Models
{
    public class Account
    {
        [Display(Name = "UserID")]
        public string UserID {  get; set; }

        [Display(Name ="BankAccNo")]
        public string BankAccNo { get; set; }

        [Display(Name ="Balance")]
        public SqlMoney Balance { get; set; }   
    }
}
