using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using agave_whiteboard_server.Models;

namespace agave_whiteboard_server
{
    public class WhiteBoardHub : Hub
    {

        public Dictionary<string, string> boards { get; set; }

        public WhiteBoardHub()
        {
            boards = new Dictionary<string, string>();
        }

        public void Hello()
        {
            Clients.All.hello();
        }

        public void Send(string name, string message, string roomName)
        {
            Clients.Group(roomName).addNewMessageToPage(name, message);
        }

        public async Task JoinRoom(string name, string roomName)
        {
            await Groups.Add(Context.ConnectionId, roomName);
            Clients.Group(roomName).systemMessage(name + " joined.");

            //if the board already exists sync to the room status
            //string boardState = boards[roomName];
            Room room = StaticModel.rooms.GetRoomById(roomName);
            
            if (room != null)
            {
                await Clients.Group(room.Name).getSync(room.Drawing);
            }
        }

        public Task LeaveRoom(string roomName)
        {
            return Groups.Remove(Context.ConnectionId, roomName);
        }

        public Task Sync(string json, string roomName)
        {
            Room room = StaticModel.rooms.GetRoomById(roomName);
            if (room != null) room.Drawing = json;
            boards[roomName] = json;
            return Clients.Group(roomName).getSync(json);
        }

    }
}