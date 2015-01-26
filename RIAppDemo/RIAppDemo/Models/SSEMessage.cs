﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RIAppDemo.Models
{
    public class Payload
    {
        public string message { get; set; }
    }

    public class SSEMessage
    {
        public Payload payload { get; set; }
        public string clientID { get; set; }
    }
}