using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoldBI.Embed.Sample.Models
{
    public class EmbedProperties
    {

        // Dashboard Server BI URL(ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)
        public static string RootUrl = "http://localhost:54321/bi";

        //  For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
        public static string SiteIdentifier = "site/site1";

        // Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `enterprise`)
        public static string Environment = "enterprise";

        // Enter your BoldBI credentials here.
        public static string UserEmail = "";

        //  Get the embedSecret key from Bold BI.Please refer this link(https://help.syncfusion.com/bold-bi/on-premise/site-settings/embed-settings)
        public static string EmbedSecret = "";
    }
}
