using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography.Xml;
using PFD_GroupA.Models;
using System.Text.Json;
using System.Data.SqlTypes;

namespace PFD_GroupA.DAL
{
    public class TransactionsDAL
    {

        private IConfiguration Configuration { get; }
        private SqlConnection conn;



        public TransactionsDAL()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            Configuration = builder.Build();
            string strConn = Configuration.GetConnectionString("PFDxOCBC");

            //Instantiate a SqlConnection object with the
            //Connection String read.
            conn = new SqlConnection(strConn);
        }


        public List<Transactions>? GetSenderTransactions(string SenderAccount)
        {
            SqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = @"SELECT * FROM Transactions WHERE SenderAccount = @SenderAccount";
            cmd.Parameters.AddWithValue(@"SenderAccount", SenderAccount);
            conn.Open();
            SqlDataReader reader = cmd.ExecuteReader();
           List<Transactions> transactionList = new List<Transactions>();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    transactionList.Add(
                    new Transactions
                    {
                        SenderAccount = reader.GetString(0),
                        RecipientAccount = reader.GetString(1),
                        AmountSent = reader.GetDecimal(2),
                        Category = reader.GetString(3),
                        TransactionDate = reader.GetDateTime(4)
                    }
                    );

                }
            }
            reader.Close();
            conn.Close();
            return transactionList;
        }

        public bool AddTransaction(string SenderAccount, string RecipientAccount, decimal AmountSent, string Category, DateTime TransactionDate)
        {
            SqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = @"INSERT INTO Transactions (SenderAccount, RecipientAccount, AmountSent, Category, TransactionDate)
                              OUTPUT INSERTED.TransactionID
                              VALUES(@senderAccount, @recipientAccount, @amountSent, @Category,@transactionDate)";
            cmd.Parameters.AddWithValue("@senderAccount", SenderAccount);
            cmd.Parameters.AddWithValue("@RecipientAccount", RecipientAccount);
            cmd.Parameters.AddWithValue("@AmountSent", AmountSent);
            cmd.Parameters.AddWithValue("@Category", Category);
            cmd.Parameters.AddWithValue("@TransactionDate", TransactionDate);
          

            conn.Open();
            cmd.ExecuteScalar();
            conn.Close();
            return true;
        }


    }
}
