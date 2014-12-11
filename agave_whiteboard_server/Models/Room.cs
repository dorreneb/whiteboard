using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace agave_whiteboard_server.Models
{
    public class Room
    {
        public Room ()
        {
            mName = null;
        }
        public Room (string id)
        {
            mName = id;
        }
        private string mName;
        public string Name 
        {
            get {return mName;}
            set {mName=value;}
        }

    }
}