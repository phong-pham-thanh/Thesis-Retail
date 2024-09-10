using APIBackend.Models;
using APIBackend.Service;
using Microsoft.AspNetCore.Mvc;

namespace APIBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WareHouseController : ControllerBase
    {

        private IWareHouseService _wareHouseService;

        public WareHouseController(IWareHouseService wareHouseService)
        {
            _wareHouseService = wareHouseService;
        }

        [HttpGet]
        public List<WareHouseModel> GetAll()
        {
            return _wareHouseService.GetAll();
        }
    }
}
