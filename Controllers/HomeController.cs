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


		public HomeController(ILogger<HomeController> logger)
		{
			_logger = logger;
		}

		public IActionResult Index()
		{
			return View();
		}

		public IActionResult Privacy()
		{
			return View();
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}


        public IActionResult Login()
        {

            return View();

        }
        [HttpPost]

        public ActionResult Login(IFormCollection account)
        {

            string loginID = account["UserID"].ToString().ToLower();

            string password = account["PinNum"].ToString();
            User? user = userContext.Login(loginID, password);
            if (user != null)
            {
                /*string role = user.Appointment.Replace(" ", "");
                var jsonString = JsonSerializer.Serialize(user);
                HttpContext.Session.SetString("AccountObject", jsonString);
                HttpContext.Session.SetString("AccountType", staff.Appointment);*/
                return RedirectToAction("Index", "User");
            }
            else
            {
                ViewData["Invalid"] = true;
                return View();
            }
        }
    }
}

//test commit