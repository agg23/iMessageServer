using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iMessageServer.Models;
using iMessageServer.Models.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace iMessageServer.Controllers
{
    public class APIController : Controller
    {
        private MessageDBContext context;

        public APIController(MessageDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public ActionResult<List<Conversation>> Conversations()
        {
            return context.Conversations.ToList();
        }

        [HttpGet]
        public ActionResult<List<Message>> Messages(string id)
        {
            if(id == null)
            {
                return null;
            }

            return context.Messages.Where(m => m.guid == id).ToList();
        }
    }
}