using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace agave_whiteboard_server.Models
{
    public class Rooms
    {
        public Rooms()
        {
            mRooms = new List<Room>();
        }

        public Room GetRoomById(string id)
        {
            foreach (Room r in mRooms)
            {
                if (r.Name == id) return r;
            }
            return null;
        }

        public bool isRoomInList(string id)
        {
            foreach (Room r in mRooms)
            {
                if (r.Name == id) return true;
            }
            return false;
        }

        private List<Room> mRooms;
        public List<Room> GetRooms()
        {
            return mRooms;
        }
        public void AddRoom(Room value)
        {
            mRooms.Add(value);
        }
    }
}