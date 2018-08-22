using Microsoft.AspNetCore.Mvc;

namespace Rest_Api.Controllers
{
  /// <summary>
  ///     Kontroler dla Widoków.
  /// </summary>
  [Route("/[controller]/[action]")]
  public class HomeController : Controller
  {
    /// <summary>
    ///     Zwraca główny widok.
    /// </summary>
    /// <returns>Widok.</returns>
    public IActionResult Index()
    {
      return View();
    }

    public IActionResult Index2()
    {
      return View();
    }
  }
}