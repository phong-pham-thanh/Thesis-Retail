using Microsoft.AspNetCore.Mvc;
using System;
using APIBackEnd.Models;
using APIBackEnd.Repository;
using APIBackend.Repository;
using APIBackEnd.Data;
using APIBackend.Models;
using APIBackend.Service;



namespace APIBackEnd.Controllers
{
    public class paramAddNewGoodRecipt
    {
        public GoodsReceiptModel goodsReceiptModel { get; set; }
        public List<GoodReceiptDetailModel> listGoodReceiptDetailModels { get; set; }
        public int idWareHouse { get; set; }
    }

    [Route("[controller]")]
    [ApiController]
    public class GoodReciptController : ControllerBase
    {
        private IGoodReciptService _goodReciptService;

        public GoodReciptController(IGoodReciptService goodReciptService)
        {
            _goodReciptService = goodReciptService;
        }
        [HttpGet]
        [Route("GetAllGoodRecipts")]
        public List<GoodsReceiptModel> GetAllGoodRecipts()
        {
            return _goodReciptService.GetAllGoodRecipts();
        }

        [HttpPost]
        [Route("addGoodRecipt")]
        public bool AddGoodRecipt([FromBody] paramAddNewGoodRecipt param)
        {
            return _goodReciptService.AddGoodRecipt(param.goodsReceiptModel, param.listGoodReceiptDetailModels, param.idWareHouse);
        }
    }
}
