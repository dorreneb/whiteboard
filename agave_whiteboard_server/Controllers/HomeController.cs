using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using agave_whiteboard_server.Models;

namespace agave_whiteboard_server.Controllers
{
    public class HomeController : Controller
    {
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            if (StaticModel.rooms==null) StaticModel.rooms = new Rooms();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [Route("{id:string}")]
        public ActionResult WhiteBoard(string id)
        {
            //if session with this id is already in progress, then make the id unique
            var originalId = id;
            while(StaticModel.rooms.isRoomInList(id))
            {
                //append number to id to make it unique and a new session
                Random rnd = new Random();
                int subid = rnd.Next(1, 9999);
                id = originalId + "#"+subid.ToString();
            }
            StaticModel.rooms.AddRoom(new Room(id));
            ViewBag.Group = id;
            return View(StaticModel.rooms.GetRooms());
        }

        public ActionResult Rooms()
        {
            
            return View(StaticModel.rooms.GetRooms());
        }

        public ActionResult Office()
        {
            return View();
        }

    }
}