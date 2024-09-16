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

        [HttpGet]
        [Route("getWarehouseById")]
        public WareHouseModel GetById(int id)
        {
            return _wareHouseService.GetById(id);
        }

        [HttpPost]
        [Route("addNewWarehouse")]
        public WareHouseModel AddNewWareHouse([FromBody] WareHouseModel WareHouse)
        {
            //{
            //    "managerId": 2,
            //    "address": "Ware house 2 edited"
            //}
            return _wareHouseService.AddNewWareHouse(WareHouse);
        }

        [HttpPut]
        [Route("updateWareHouseById/{id}")]
        public WareHouseModel Put(int id, [FromBody] WareHouseModel wareHouse)
        {
            //{
            //    "managerId": 2,
            //    "address": "Ware house 2 edited"
            //}
            return _wareHouseService.UpdateWareHouse(id, wareHouse);
        }
    }
}
