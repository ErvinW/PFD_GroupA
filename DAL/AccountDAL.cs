using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography.Xml;
using PFD_GroupA.Models;
using System.Text.Json;
using System.Data.SqlTypes;
using NuGet.Protocol.Plugins;
using static IronPython.Modules.PythonCsvModule;

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

        public bool Deduct(string Sender, decimal Total, decimal Sent)
        {
            if (Total >= Sent)
            {
				SqlCommand cmd = conn.CreateCommand();
				cmd.CommandText = @"UPDATE BankAcc
                                SET Balance = @Balance
                                WHERE UserID = @UserID";
				cmd.Parameters.AddWithValue(@"UserID", Sender);
				cmd.Parameters.AddWithValue(@"Balance", Total - Sent);
				conn.Open();
				cmd.ExecuteScalar();
				conn.Close();
				return true;
			}
           
            else
            {
                return false;
            }

        }

        public decimal GetAccountBalance(string UserID)
        {
			SqlCommand cmd = conn.CreateCommand();
			cmd.CommandText = @"SELECT Balance FROM BankAcc WHERE UserID = @UserID";
			cmd.Parameters.AddWithValue(@"UserID", UserID);
            conn.Open();
			SqlDataReader reader = cmd.ExecuteReader();
			decimal balance = 0;
			while (reader.Read())
			{
				balance = reader.GetDecimal(0);
				break;
			}
			conn.Close();
			return balance;
			
           
		}


        public bool Increase(string Recieve, decimal Balance, decimal Sent)
        {
            SqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = @"UPDATE BankAcc
                                SET Balance = @Balance
                                WHERE UserID = @UserID";
            cmd.Parameters.AddWithValue(@"UserID", Recieve);
            cmd.Parameters.AddWithValue(@"Balance",  Balance + Sent);
            conn.Open();
            cmd.ExecuteScalar();
            conn.Close();
            return true;


        }


    }
}
