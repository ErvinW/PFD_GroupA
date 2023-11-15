using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography.Xml;
using PFD_GroupA.Models;
using System.Text.Json;


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
                        TransactionDate = reader.GetDateTime(3)
                    }
                    );

                }
            }
            reader.Close();
            conn.Close();
            return transactionList;
        }

        public int AddTransaction(Transactions transaction)
        {
            SqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = @"INSERT INTO Transactions (SenderAccount, RecipientAccount, AmountSent, TransactionDate)
                              OUTPUT INSERTED.TransactionID 
                              VALUES(@senderAccount, @recipientAccount, @amountSent, @transactionDate)";
            cmd.Parameters.AddWithValue("@senderAccount", transaction.SenderAccount);
            cmd.Parameters.AddWithValue("@RecipientAccount", transaction.RecipientAccount);
            cmd.Parameters.AddWithValue("@AmountSent", transaction.AmountSent);
            cmd.Parameters.AddWithValue("@TransactionDate", transaction.TransactionDate);

            conn.Open();
            transaction.TransactionID = (int)cmd.ExecuteScalar();
            conn.Close();
            return transaction.TransactionID;
        }


    }
}
