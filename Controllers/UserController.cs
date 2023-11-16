using Microsoft.AspNetCore.Mvc;
using PFD_GroupA.DAL;
using PFD_GroupA.Models;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Reflection;
using System.Runtime.ConstrainedExecution;
using System.Diagnostics;
using System.Data.SqlTypes;
using Microsoft.AspNetCore.Mvc.RazorPages;

//using IronPython.Hosting;
//using Microsoft.Scripting.Hosting;

namespace PFD_GroupA.Controllers
{
    public class UserController : Controller
    {
        TransactionsDAL transactionsContext = new TransactionsDAL();
        AccountDAL accountContext = new AccountDAL();
        UserKeybindsDAL keybindContext = new UserKeybindsDAL();
		private List<SelectListItem> pageList = new List<SelectListItem>();
        UserDAL userContext = new UserDAL();
        /*public void RunPythonScript()
        {
            var engine = Python.CreateEngine();
            var searchPaths = engine.GetSearchPaths();

            Console.WriteLine("IronPython Search Paths:");
            foreach(var path in searchPaths)
            {
                Console.WriteLine(path + " lolol");
            }

            ICollection<string> paths = engine.GetSearchPaths();
            paths.Add(".");
            paths.Add("D:\\YEAR 2 SEM 2\\PFD\\Solution\\bin\\Debug\\net6.0\\lib");
            paths.Add("D:\\YEAR 2 SEM 2\\PFD\\Solution\\bin\\Debug\\net6.0\\DLLs");
            engine.SetSearchPaths(paths);
            // Load the Python script
            var scriptPath = "D:\\YEAR 2 SEM 2\\PFD\\Solution\\Python Script\\pythontest.py"; // Replace this with your script's path
            var scope = engine.CreateScope();
            var source = engine.CreateScriptSourceFromFile(scriptPath);
            source.Execute(scope);
            //engine.ExecuteFile(scriptPath);
        }
        */
		// GET: UserController
		public ActionResult Index()
        {
            var ID = HttpContext.Session.GetString("AccountObject");
            var UID = JsonSerializer.Deserialize<User>(ID);
            string UserID = UID.UserID;
            decimal balance = accountContext.GetAccountBalance(UserID);
            HttpContext.Session.SetString("Balance", balance.ToString());
			UserKeybinds keybinds = keybindContext.GetUserKeybinds(UserID);
			return View(keybinds);
			
        }
		public ActionResult Account()
		{
			var ID = HttpContext.Session.GetString("AccountObject");
			var UID = JsonSerializer.Deserialize<User>(ID);
			string UserID = UID.UserID;

			UserKeybinds keybinds = keybindContext.GetUserKeybinds(UserID);
			return View(keybinds);
		}
		public ActionResult Cards()
		{
			var ID = HttpContext.Session.GetString("AccountObject");
			var UID = JsonSerializer.Deserialize<User>(ID);
			string UserID = UID.UserID;
			
			UserKeybinds keybinds = keybindContext.GetUserKeybinds(UserID);
			return View(keybinds);
		}
		public ActionResult Settings()
		{
			var ID = HttpContext.Session.GetString("AccountObject");
			var UID = JsonSerializer.Deserialize<User>(ID);
			string UserID = UID.UserID;

			UserKeybinds keybinds = keybindContext.GetUserKeybinds(UserID);
			return View(keybinds);
		}
		public ActionResult Help()
		{
			var ID = HttpContext.Session.GetString("AccountObject");
            //	var UID = JsonSerializer.Deserialize<User>(ID);
            //	string UserID = UID.UserID;

            //	UserKeybinds keybinds = keybindContext.GetUserKeybinds(UserID);
            //	return View(keybinds);
            return View();

        }
		public ActionResult Transfer()
        {
			var ID = HttpContext.Session.GetString("AccountObject");
			var UID = JsonSerializer.Deserialize<User>(ID);
			string UserID = UID.UserID;

			UserKeybinds keybinds = keybindContext.GetUserKeybinds(UserID);
			return View(keybinds);
        }

        [HttpGet]
        public IActionResult GetKeybindData()
        {
            string kData = HttpContext.Session.GetString("Keybinds");
            return Json(new { myData = kData });
        }

        [HttpGet]
        public ActionResult Keybind()
        {
            Account acc = JsonSerializer.Deserialize<Account>(HttpContext.Session.GetString("AccountObject"));
            UserKeybinds keybinds = keybindContext.GetUserKeybinds(acc.UserID);
            Console.WriteLine(keybinds.HomePage);
            Console.WriteLine(keybinds.TransferPage);
            return View(keybinds);
        }

        [HttpPost]
        public ActionResult Keybind([FromBody] KeybindRequest keybindRequest)
        {
            // Process the received keys and pageName
            Console.WriteLine("Keys received: " + string.Join(" ", keybindRequest.Keys));
            Console.WriteLine("Page name received: " + keybindRequest.PageName);

            //Update Keybind
            Account acc = JsonSerializer.Deserialize<Account>(HttpContext.Session.GetString("AccountObject"));
            UserKeybinds keybinds = keybindContext.GetUserKeybinds(acc.UserID);

            Type keybindsType = typeof(UserKeybinds);

            // Get all properties of the class
            PropertyInfo[] properties = keybindsType.GetProperties();

            // Display the property names
            foreach (var property in properties)
            {
                if (property.Name == keybindRequest.PageName)
                {
                    // Use SetValue to update the value of the property
                    property.SetValue(keybinds, string.Join(" ", keybindRequest.Keys));
                }
            }
            keybindContext.UpdateKeybinds(keybinds);

            //return RedirectToAction("Index","User");



            return Json(new { success = true, message = "Keys received successfully" });
        }

        public class KeybindRequest
        {
            public List<string> Keys { get; set; }
            public string PageName { get; set; }
        }


		public ActionResult Logout()
		{
			HttpContext.Session.Clear();
			return RedirectToAction("Index", "Home");
		}



		// GET: UserController/Details/5
		public ActionResult Details(int id)
        {
            return View();
        }

        // GET: UserController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: UserController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // POST: UserController/Edit
        [HttpPost]
        public ActionResult Edit([FromBody] KeybindRequest keybindRequest)
        {
            Account acc = JsonSerializer.Deserialize<Account>(HttpContext.Session.GetString("AccountObject"));
            UserKeybinds keybinds = keybindContext.GetUserKeybinds(acc.UserID);


            // Iterate through properties of the object
            foreach (var property in keybinds.GetType().GetProperties())
            {
                // Check if the property is not UserID
                if (property.Name == keybindRequest.PageName)
                {
                    property.SetValue(keybinds, string.Join(" ", keybindRequest.Keys));
                }
            }
            keybindContext.UpdateKeybinds(keybinds);
            return Json(new { success = true, message = "Keys received successfully" });
        }

       
       

        // POST: UserController/Delete
        [HttpPost]
        public ActionResult Delete([FromBody]string pageName)
        {
            Account acc = JsonSerializer.Deserialize<Account>(HttpContext.Session.GetString("AccountObject"));
            UserKeybinds keybinds = keybindContext.GetUserKeybinds(acc.UserID);

            // Iterate through properties of the object
            foreach (var property in keybinds.GetType().GetProperties())
            {
                // Check if the property is UserID
                Console.WriteLine("p1"+property.Name);
                Console.WriteLine("p2"+pageName);
                if (property.Name == pageName)
                {
                    property.SetValue(keybinds, "");
                }
            }
            
            keybindContext.UpdateKeybinds(keybinds);
            //return RedirectToAction("Index","User");
            return null;
        }
        public ActionResult Confirmation()
        {
            /*string Object = HttpContext.Session.GetString("AccountObject");
            User AccountObject = JsonSerializer.Deserialize<User>(Object);
			List<Transactions> OutgoingTransactions = transactionsContext.GetSenderTransactions(AccountObject.UserID);
            */
            return View();
        }

        public ActionResult ExecutePython()
        {
            System.Diagnostics.ProcessStartInfo start = new System.Diagnostics.ProcessStartInfo();
            //python interprater location
            start.FileName = @"C:\Users\Katana\AppData\Local\Microsoft\WindowsApps\python.exe";
            //argument with file name and input parameters
            start.Arguments = string.Format("{ 0} {1} {2}", Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "pythontest.py"), 5, 10);
            start.UseShellExecute = false;// Do not use OS shell
            start.CreateNoWindow = true; // We don't need new window
            start.RedirectStandardOutput = true;// Any output, generated by application will be redirected back
            start.RedirectStandardError = true; // Any error in standard output will be redirected back (for example exceptions)
            start.LoadUserProfile = true;
            Console.ReadLine();
            return View();
        }

        [HttpPost]
        public ActionResult CreateTransaction(IFormCollection transaction)
        {
			var ID = HttpContext.Session.GetString("AccountObject");
            var IDBank = HttpContext.Session.GetString("BankAcc");
            var UIDBank = JsonSerializer.Deserialize<Account>(IDBank);
			var UID = JsonSerializer.Deserialize<User>(ID);
			string SenderID = UID.UserID;
            decimal BankBalance = UIDBank.Balance;
            string RecipientID = transaction["recipient"].ToString();
            string AmountSent = transaction["amount"].ToString();
            string Category = transaction["category"].ToString();
			decimal sqlAmountSent = decimal.Parse(AmountSent);
            DateTime TransactionDate = DateTime.Now;
            User? user = userContext.Check(RecipientID);
            decimal Balance = accountContext.GetAccountBalance(RecipientID);
            decimal SenderBalance = accountContext.GetAccountBalance(SenderID);
            if (user != null)
            {

                Console.WriteLine(BankBalance);
                
                    
                    bool deduction = accountContext.Deduct(SenderID, SenderBalance, sqlAmountSent);
                    if (deduction == true)
                    {
                        Console.WriteLine(12);
					    bool increase = accountContext.Increase(RecipientID, Balance, sqlAmountSent);
					    transactionsContext.AddTransaction(SenderID, RecipientID, sqlAmountSent, Category, TransactionDate);
                        
				    }

                else
                {
                    Console.WriteLine("Failed");
                }
                   
			

			}
			return RedirectToAction("Index", "User");
        }
    }
}
