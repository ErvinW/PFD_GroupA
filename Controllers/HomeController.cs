using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using PFD_GroupA.Models;
using PFD_GroupA.DAL;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Runtime.ConstrainedExecution;
using System.Security.Principal;

namespace PFD_GroupA.Controllers
{
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;
        private UserDAL userContext = new UserDAL();
        private AccountDAL AccountContext = new AccountDAL();
		private UserKeybindsDAL userKeybindsContext = new UserKeybindsDAL();

		public async Task RunPythonScript()
		{
			string pythonInterpreterPath = @"C:\Users\Katana\AppData\Local\Microsoft\WindowsApps\python.exe";
			string pythonScriptPath = @"D:\YEAR 2 SEM 2\PFD\Solution\Python Script\pythontest.py";

			ProcessStartInfo startInfo = new ProcessStartInfo
			{
				FileName = pythonInterpreterPath,
				Arguments = $"\"{pythonScriptPath}\"",
				UseShellExecute = false,
				RedirectStandardOutput = true,
				RedirectStandardError = true,
				CreateNoWindow = true
			};

			using (Process process = Process.Start(startInfo))
			{
				if (process != null)
				{
					await Task.Run(() =>
					{
						string output = process.StandardOutput.ReadToEnd();
						Console.WriteLine(output);
						process.WaitForExit();
					});
				}
			}
		}



		public IActionResult Index()
		{
			HttpContext.Session.Clear();
			RunPythonScript();
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
				//decimal balance = AccountContext.GetAccountBalance(loginID);
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
				//HttpContext.Session.SetString("BankBalance", balance.ToString());
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