﻿using System;
using System.Collections.Generic;
using System.Dynamic;

namespace iMessageServer.Utility
{
    public static class ExpandoObjectHelper
    {
        public static bool HasProperty(ExpandoObject obj, string propertyName)
        {
            return ((IDictionary<String, object>)obj).ContainsKey(propertyName);
        }
    }
}
