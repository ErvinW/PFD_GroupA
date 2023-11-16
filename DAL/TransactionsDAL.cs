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
                        TransactionID = reader.GetInt32(0),
                        SenderAccount = reader.GetString(1),
                        RecipientAccount = reader.GetString(2),
                        AmountSent = reader.GetDecimal(3),
                        TransactionDate = reader.GetDateTime(4)
                    }
                    );

                }
            }
            reader.Close();
            conn.Close();
            return transactionList;
        }

        public bool AddTransaction(string SenderAccount, string RecipientAccount, SqlMoney AmountSent, DateTime TransactionDate)
        {
            SqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = @"INSERT INTO Transactions (TransactionID, SenderAccount, RecipientAccount, AmountSent, TransactionDate)
                              
                              VALUES(@RecordID, @senderAccount, @recipientAccount, @amountSent, @transactionDate)";
            cmd.Parameters.AddWithValue("@senderAccount", SenderAccount);
            cmd.Parameters.AddWithValue("@RecipientAccount", RecipientAccount);
            cmd.Parameters.AddWithValue("@AmountSent", AmountSent);
            cmd.Parameters.AddWithValue("@TransactionDate", TransactionDate);
            cmd.Parameters.AddWithValue("@RecordID", 3);

            conn.Open();
            cmd.ExecuteScalar();
            conn.Close();
            return true;
        }


    }
}
