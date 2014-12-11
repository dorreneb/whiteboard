using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;

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
            string boardState = boards[roomName];
            if (boardState != null)
            {
                await Clients.Group(roomName).getSync(boardState);
            }
        }

        public Task LeaveRoom(string roomName)
        {
            return Groups.Remove(Context.ConnectionId, roomName);
        }

        public Task Sync(string json, string roomName)
        {
            boards[roomName] = json;
            return Clients.Group(roomName).getSync(json);
        }

    }
}