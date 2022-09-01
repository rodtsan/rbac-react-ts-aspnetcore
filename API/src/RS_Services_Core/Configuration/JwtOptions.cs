using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RS_Services_Core.Configuration
{
    public class JwtOptions
    {
        public static string ConfigSection = "Jwt";
        public string SigningKey { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public int ExpiresAt { get; set; }

    }
}
