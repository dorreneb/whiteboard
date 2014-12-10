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

        public void Hello()
        {
            Clients.All.hello();
        }

        public void Send(string name, string message, string roomName)
        {
            //Clients.All.addNewMessageToPage(name, message);
            Clients.Group(roomName).addNewMessageToPage(name, message);
        }

        public async Task JoinRoom(string name, string roomName)
        {
            await Groups.Add(Context.ConnectionId, roomName);
            Clients.Group(roomName).systemMessage(name + " joined.");
        }

        public Task LeaveRoom(string roomName)
        {
            return Groups.Remove(Context.ConnectionId, roomName);
        }

    }
}