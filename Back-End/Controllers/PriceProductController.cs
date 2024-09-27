using APIBackend.Models;
using APIBackend.Service;
using APIBackEnd.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class PriceProductController : ControllerBase
    {
        private IPriceProductService _priceProductService;

        public PriceProductController(IPriceProductService priceProductService)
        {
            _priceProductService = priceProductService;
        }

        [HttpGet]
        public List<PriceProductModel> GetAll()
        {
            return _priceProductService.GetAll();
        }

        [HttpPost]
        [Route("addNewPriceProduct")]
        public PriceProductModel AddNewPriceProduct([FromBody] PriceProductModel item)
        {
            return _priceProductService.AddNew(item);
        }
    }
}
