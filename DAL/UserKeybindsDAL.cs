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
						break;
					}
				}
			}

			reader.Close();
			conn.Close();
			return userBinds;
		}

		public int UpdateKeybinds (UserKeybinds userBinds)
		{
			SqlCommand cmd = conn.CreateCommand();

			//Define parameters
			cmd.CommandText = @"UPDATE UserKeybinds SET TransferPage=@transferPage, HomePage=@homePage, LogoutFunc=@logoutFunc WHERE UserID=@loginID";
			cmd.Parameters.AddWithValue("@transferPage", userBinds.TransferPage);
			cmd.Parameters.AddWithValue("@homePage", userBinds.HomePage);
			cmd.Parameters.AddWithValue("@logoutFunc", userBinds.LogoutFunc);
			cmd.Parameters.AddWithValue("@loginID", userBinds.UserID);

			//Open connection
			conn.Open();
			int count = cmd.ExecuteNonQuery();

			//Close connection
			conn.Close();

			return count;
        }

	}
}
