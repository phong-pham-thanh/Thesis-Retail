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

        [HttpGet]
        [Route("getGoodReciptBydId/{id}")]
        public GoodsReceiptModel GetGoodReciptById(int id)
        {
            return _goodReciptService.GetGoodReciptById(id);
        }

        [HttpPost]
        [Route("addGoodRecipt")]
        public bool AddGoodRecipt([FromBody] paramAddNewGoodRecipt param)
        {
            return _goodReciptService.AddGoodRecipt(param.goodsReceiptModel, param.listGoodReceiptDetailModels);
        }

        [HttpGet]
        [Route("acceptGoodImport/{id}")]
        public GoodsReceiptModel AcceptGoodReceipt(int id)
        {
            return _goodReciptService.AcceptGoodReceipt(id);
        }
    }
}
