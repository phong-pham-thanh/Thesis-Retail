using APIBackend.DataModel.Analyse;
using APIBackend.Models;
using APIBackend.Service;
using APIBackEnd.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _service;
        public InventoryController(IInventoryService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("getAllInventory")]
        public List<InventoryModel> GetAllInventory()
        {
            return _service.GetAllInventory();
        }

        [HttpGet]
        [Route("getInventoryByWarehouseId/{warehouseId}")]
        public List<InventoryModel> GetInventoryByWarehouseId(int warehouseId)
        {
            return _service.GetInventoryByWarehouseId(warehouseId);
        }
    }
}
