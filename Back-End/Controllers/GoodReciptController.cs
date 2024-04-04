using Microsoft.AspNetCore.Mvc;
using System;
using APIBackEnd.Models;
using APIBackEnd.Repository;
using APIBackend.Repository;
using APIBackEnd.Data;
using APIBackend.Models;

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
        private IGoodReciptRepository _goodReciptRepository;

        public GoodReciptController(IGoodReciptRepository goodReciptRepository)
        {
            _goodReciptRepository = goodReciptRepository;
        }

        [HttpPost]
        [Route("addGoodRecipt")]
        public bool AddGoodRecipt([FromBody] paramAddNewGoodRecipt param)
        {
            return _goodReciptRepository.AddGoodRecipt(param.goodsReceiptModel, param.listGoodReceiptDetailModels, param.idWareHouse);
        }
    }
}
