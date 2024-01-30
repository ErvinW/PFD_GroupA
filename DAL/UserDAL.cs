using System.Data.SqlClient;
using System.Security.Cryptography.Xml;
using PFD_GroupA.Models;
using PFD_GroupA.DAL;

namespace PFD_GroupA.DAL
{
    public class UserDAL
    {

        private IConfiguration Configuration { get; }
        private SqlConnection conn;
           


        public UserDAL()
        {
            //Read ConnectionString from appsettings.json file
            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json");
            

            Configuration = builder.Build();
            string strConn = Configuration.GetConnectionString("PFDxOCBC");

            conn = new SqlConnection(strConn);  
        }

        public User Check(string userID)
        {
			SqlCommand cmd = conn.CreateCommand();
			cmd.CommandText = @"SELECT * FROM UserAccount where UserID = @loginID";
			cmd.Parameters.AddWithValue("@loginID", userID);

			//Open a database connection
			conn.Open();
			//Execute the SELECT SQL through a DataReader
			SqlDataReader reader = cmd.ExecuteReader();
			//Read all records until the end
			User? user = null;

			if (reader.HasRows)
			{
				while (reader.Read())
				{
					// Password comparison is case-sensitive
					if (reader.GetString(0).ToLower() == userID)
					{
						user = new User();
						user.UserID = reader.GetString(0);
						user.UserName = reader.GetString(1);
						user.PinNum = reader.GetString(2);
						break;
					}
				}
			}

			reader.Close();
			conn.Close();
			return user;
		}


        public User Login(string loginId, string password)
        {
            
            //Create a SqlCommand object from connection object
            SqlCommand cmd = conn.CreateCommand();
            //Specify the SELECT SQL statement 
            cmd.CommandText = @"SELECT * FROM UserAccount where UserID = @loginID";
            cmd.Parameters.AddWithValue("@loginID", loginId);
			//Open a database connection
			conn.Open();
			//Execute the SELECT SQL through a DataReader
			SqlDataReader reader = cmd.ExecuteReader();
			//Read all records until the end
			User? user = null;
			if (reader.HasRows)
            {
                while (reader.Read())
                {
					// Password comparison is case-sensitive
                    if ((reader.GetString(0).ToLower() == loginId) &&
                    (reader.GetString(2) == password))
                    {
						user = new User();
                        user.UserID = reader.GetString(0);
                        user.UserName = reader.GetString(1);
                        user.PinNum = reader.GetString(2);
                        break;
                    }
                }
            }

            reader.Close();
            conn.Close();
            return user;
        }

        public User FaceRecog(string name)
        {
			SqlCommand cmd = conn.CreateCommand();
			//Specify the SELECT SQL statement 
			cmd.CommandText = @"SELECT * FROM UserAccount where UserName = @name";
			cmd.Parameters.AddWithValue("@name", name);
			//Open a database connection
			conn.Open();
			//Execute the SELECT SQL through a DataReader
			SqlDataReader reader = cmd.ExecuteReader();
			//Read all records until the end
			User? user = null;
			if (reader.HasRows)
			{
				while (reader.Read())
				{
					// Password comparison is case-sensitive
					if (reader.GetString(1).ToLower() == name)
					{
						user = new User();
						user.UserID = reader.GetString(0);
						user.UserName = reader.GetString(1);
						user.PinNum = reader.GetString(2);
						break;
					}
				}
			}

			reader.Close();
			conn.Close();
			return user;
		}
    }
}
