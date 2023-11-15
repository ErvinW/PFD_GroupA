using Microsoft.AspNetCore.Mvc;
using PFD_GroupA.DAL;
using PFD_GroupA.Models;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Reflection;
using System.Runtime.ConstrainedExecution;
using System.Diagnostics;
using IronPython.Hosting;
using Microsoft.Scripting.Hosting;

namespace PFD_GroupA.Controllers
{
    public class UserController : Controller
    {
        TransactionsDAL transactionsContext = new TransactionsDAL();
        UserKeybindsDAL keybindContext = new UserKeybindsDAL();
		private List<SelectListItem> pageList = new List<SelectListItem>();

        public void RunPythonScript()
        {
            ScriptEngine engine = Python.CreateEngine();
            ICollection<string> Paths = engine.GetSearchPaths();
            Paths.Add("\"D:\\YEAR 2 SEM 2\\PFD\\Solution\\Python Script\\myenv\\Lib\\site-packages\\cv2\"");
            Paths.Add("\"D:\\YEAR 2 SEM 2\\PFD\\Solution\\Python Script\\myenv\\Lib\\site-packages\\mediapipe\"");
            Paths.Add("\"D:\\YEAR 2 SEM 2\\PFD\\Solution\\Python Script\\myenv\\Lib\\site-packages\\pyautogui\"");
            engine.SetSearchPaths(Paths);

            // Load the Python script
            var scriptPath = "D:\\YEAR 2 SEM 2\\PFD\\Solution\\Python Script\\pythontest.py"; // Replace this with your script's path
            engine.ExecuteFile(scriptPath);
        }

		// GET: UserController
		public ActionResult Index()
        {
            var ID = HttpContext.Session.GetString("AccountObject");
            var UID = JsonSerializer.Deserialize<User>(ID);
            string UserID = UID.UserID;

            } */
            return View();
        }

        public ActionResult Transfer()
        {
            /*string Object = HttpContext.Session.GetString("AccountObject");
            User AccountObject = JsonSerializer.Deserialize<User>(Object);
			List<Transactions> OutgoingTransactions = transactionsContext.GetSenderTransactions(AccountObject.UserID);
            */
            return View();
        }

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

            // Now keybinds object has the updated property value



            // You can return a response if needed
            return Json(new { success = true, message = "Keys received successfully" });
        }

        public class KeybindRequest
        {
            public List<string> Keys { get; set; }
            public string PageName { get; set; }
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

        // GET: UserController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: UserController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
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

        // GET: UserController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: UserController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            Account acc = JsonSerializer.Deserialize<Account>(HttpContext.Session.GetString("AccountObject"));
            UserKeybinds keybinds = keybindContext.GetUserKeybinds(acc.UserID);

            // Iterate through properties of the object
            foreach (var property in keybinds.GetType().GetProperties())
            {
                // Check if the property is UserID
                if (property.Name == "UserID")
                {
                    // Skip setting UserID to an empty string
                    continue;
                }

                // Set other properties to an empty string
                property.SetValue(keybinds, "");
            }

            keybindContext.UpdateKeybinds(keybinds);
            return RedirectToAction("Index","User");
        }
        public ActionResult Confirmation()
        {
            /*string Object = HttpContext.Session.GetString("AccountObject");
            User AccountObject = JsonSerializer.Deserialize<User>(Object);
			List<Transactions> OutgoingTransactions = transactionsContext.GetSenderTransactions(AccountObject.UserID);
            */
            return View();
        }
    }
}
