using PFD_GroupA.Models;
using System.Data.SqlClient;

namespace PFD_GroupA.DAL
{
    public class KeybindDAL
    {
        private IConfiguration Configuration { get; }
        private SqlConnection conn;

        public KeybindDAL()
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

        public List<Keybind> GetAllKeybinds()
        {
            SqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = @"SELECT * FROM Keybinds";
            conn.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            List<Keybind> keybindList = new List<Keybind>();
            while (reader.Read())
            {
                keybindList.Add(
                new Keybind
                {
                    UserID = reader.GetString(0),
                    KeybindPage = reader.GetString(1),
                    Keys = reader.GetString(2)
                }
                );
            }
            reader.Close();
            conn.Close();
            return keybindList;
        }
    }
}
