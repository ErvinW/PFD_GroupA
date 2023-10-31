using System.Data.SqlClient;
using PFD_GroupA.Models;


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
    }
}
