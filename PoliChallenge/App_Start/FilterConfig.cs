using System.Web.Mvc;
using PoliChallenge.Business._Core;

namespace PoliChallenge
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new CustomAuthorize());
        }
    }
}
