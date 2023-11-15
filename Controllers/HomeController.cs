using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using PFD_GroupA.Models;
using PFD_GroupA.DAL;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Runtime.ConstrainedExecution;

namespace PFD_GroupA.Controllers
{
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;
        private UserDAL userContext = new UserDAL();
        private AccountDAL AccountContext = new AccountDAL();
		private UserKeybindsDAL userKeybindsContext = new UserKeybindsDAL();




        public IActionResult Index()
		{
			
			return View();
		}

		public IActionResult Landing()
		{
			return View();
		}

		

		[HttpPost]
		public ActionResult Login(IFormCollection account)
		{

			string loginID = account["logemail"].ToString().ToLower();
			string password = account["logpass"].ToString().ToLower();
			
            //string password = account["PinNum"].ToString();
			User? user = userContext.Login(loginID, password);
			
            if (user != null)
			{
                Account BankAccount = AccountContext.GetAccount(loginID);
                UserKeybinds userKeybinds = userKeybindsContext.GetUserKeybinds(loginID);
                //Console.WriteLine(user.UserID);
                //Store account deets in Session
                var jsonString = JsonSerializer.Serialize(user);
                //Console.WriteLine(BankAccount.BankAccNo);
				Console.WriteLine(userKeybinds.TransferPage);
                var jsonAccString = JsonSerializer.Serialize(BankAccount);
				var KeyBinds = JsonSerializer.Serialize(userKeybinds);
				HttpContext.Session.SetString("KeyBinds", KeyBinds); //
				HttpContext.Session.SetString("BankAcc", jsonAccString);
				HttpContext.Session.SetString("AccountObject", jsonString);
				HttpContext.Session.SetString("AccountType", "User");
				
				return RedirectToAction("Index", "User");
			}
			else
			{
				TempData["Message"] = "Invalid Login Credentials";
				return RedirectToAction("Index");
			}
		}



	}
}

//test commit