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
				//Store account deets in Session
				HttpContext.Session.SetString("LoginID", loginID);
				HttpContext.Session.SetString("Name", password);
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