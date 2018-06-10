using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using iMessageServer.Models;

namespace iMessageServer.Controllers
{
    public class HomeController : Controller
    {
        private BridgeClient bridgeClient;

        public HomeController(BridgeClient bridgeClient)
        {
            // TODO: Find better way to initialize singleton
            this.bridgeClient = bridgeClient;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
