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
    public struct paramAddNewGoodRecipt
    {
        public GoodsReceiptModel goodsReceiptModel;
        public List<GoodReceiptDetailModel> listGoodReceiptDetailModels;
        public int idWareHouse;
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

        [HttpPost]
        [Route("addGoodRecipt")]
        public bool AddGoodRecipt([FromBody] paramAddNewGoodRecipt param)
        {
            return _goodReciptService.AddGoodRecipt(param.goodsReceiptModel, param.listGoodReceiptDetailModels, param.idWareHouse);
        }
    }
}
