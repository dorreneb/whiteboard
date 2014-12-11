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

        [Route("{isJoin:string}{id:string}")]
        public ActionResult WhiteBoard(string isJoin, string id)
        {
            if (isJoin == "true")
            {
                //if session no longer exists, recreate it
                if (!StaticModel.rooms.isRoomInList(id))
                {
                    StaticModel.rooms.AddRoom(new Room(id));
                }
                ViewBag.Group = id;
                return View(StaticModel.rooms.GetRooms());
            }
            //if not joining, then this is a request for a new room with the given id
            //we need to make sure the id is unique first
            var originalId = id;
            while (StaticModel.rooms.isRoomInList(id))
            {
                //append number to id to make it unique and a new session
                Random rnd = new Random();
                int subid = rnd.Next(1, 9999);
                id = originalId + "#" + subid.ToString();
                //keep looping and checking until we know the id is unique
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