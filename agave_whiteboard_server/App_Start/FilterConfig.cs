﻿using System.Web;
using System.Web.Mvc;

namespace agave_whiteboard_server
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
