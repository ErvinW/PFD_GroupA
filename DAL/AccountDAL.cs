using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography.Xml;
using PFD_GroupA.Models;
using System.Text.Json;


namespace PFD_GroupA.DAL
{
    public class AccountDAL
    {
        private IConfiguration Configuration { get; }
        private SqlConnection conn;


        public AccountDAL()
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


        public Account GetAccount(string UserID)
        {
            SqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = @"SELECT * FROM BankAcc WHERE UserID = @UserID";
            cmd.Parameters.AddWithValue(@"UserID", UserID);
            conn.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Account account = new Account();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    account.UserID = reader.GetString(0);
                    account.BankAccNo = reader.GetString(1);
                    account.Balance = reader.GetDecimal(2);
                    break;
                }
            }
            reader.Close();
            conn.Close();
            return account;
        }



    }
}
