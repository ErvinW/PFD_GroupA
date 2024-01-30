using System.Data.SqlClient;
using System.Security.Cryptography.Xml;
using PFD_GroupA.Models;
using PFD_GroupA.DAL;


namespace PFD_GroupA.DAL
{
	public class UserKeybindsDAL
	{
		private IConfiguration Configuration { get; }
		private SqlConnection conn;


		public UserKeybindsDAL()
		{
			//Read ConnectionString from appsettings.json file
			var builder = new ConfigurationBuilder()
			.SetBasePath(Directory.GetCurrentDirectory())
			.AddJsonFile("appsettings.json");


			Configuration = builder.Build();
			string strConn = Configuration.GetConnectionString("PFDxOCBC");

			conn = new SqlConnection(strConn);
		}


		public UserKeybinds GetUserKeybinds(string loginId)
		{

			//Create a SqlCommand object from connection object
			SqlCommand cmd = conn.CreateCommand();
			//Specify the SELECT SQL statement 
			cmd.CommandText = @"SELECT * FROM UserKeybinds where UserID = @loginID";
			cmd.Parameters.AddWithValue("@loginID", loginId);
			//Open a database connection
			conn.Open();
			//Execute the SELECT SQL through a DataReader
			SqlDataReader reader = cmd.ExecuteReader();
			//Read all records until the end
			UserKeybinds? userBinds = null;
			if (reader.HasRows)
			{
				while (reader.Read())
				{
					// Password comparison is case-sensitive
					if (reader.GetString(0) == loginId)
					{
                        userBinds = new UserKeybinds();
						userBinds.UserID = reader.GetString(0);
						userBinds.TransferPage = reader.GetString(1);
						userBinds.HomePage = reader.GetString(2);
						userBinds.LogoutFunc = reader.GetString(3);
						userBinds.AccountPage = reader.GetString(4);
						userBinds.Cards = reader.GetString(5);
						userBinds.Settings = reader.GetString(6);
						userBinds.Help = reader.GetString(7);
						userBinds.Keybind = reader.GetString(8);
						break;
					}
				}
			}

			reader.Close();
			conn.Close();
			return userBinds;
		}

		public int UpdateKeybinds (UserKeybinds? userBinds)
		{
			SqlCommand cmd = conn.CreateCommand();
            Console.WriteLine("trans:"+ userBinds.TransferPage);
            Console.WriteLine("home:" + userBinds.HomePage);
            //Define parameters
            cmd.CommandText = @"UPDATE UserKeybinds SET TransferPage=@transferPage, HomePage=@homePage, LogoutFunc=@logoutFunc, AccountPage=@accountPage, Cards=@cards, Settings=@settings, Help=@help WHERE UserID=@loginID";
			cmd.Parameters.AddWithValue("@transferPage", userBinds.TransferPage);
			cmd.Parameters.AddWithValue("@homePage", userBinds.HomePage);
			cmd.Parameters.AddWithValue("@logoutFunc", userBinds.LogoutFunc);
			cmd.Parameters.AddWithValue("@loginID", userBinds.UserID);
			cmd.Parameters.AddWithValue("@accountPage", userBinds.AccountPage);
			cmd.Parameters.AddWithValue("@cards", userBinds.Cards);
			cmd.Parameters.AddWithValue("@settings", userBinds.Settings);
			cmd.Parameters.AddWithValue("@help", userBinds.Help);
			cmd.Parameters.AddWithValue("@keybind", userBinds.Keybind);

			//Open connection
			conn.Open();
			int count = cmd.ExecuteNonQuery();

			//Close connection
			conn.Close();

			return count;
        }

    }
}
