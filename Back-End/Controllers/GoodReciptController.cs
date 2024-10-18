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
            return _goodReciptService.AddGoodRecipt(param.goodsReceiptModel, param.listGoodReceiptDetailModels, autoAccept: false);
        }

        [HttpGet]
        [Route("acceptGoodImport/{id}")]
        public GoodsReceiptModel AcceptGoodReceipt(int id)
        {
            return _goodReciptService.AcceptGoodReceipt(id);
        }

        [HttpPut]
        [Route("updateGoodReceipt/{id}")]
        public GoodsReceiptModel EditGoodReceipt(int id, [FromBody] GoodsReceiptModel goodsReceiptModel)
        {
            // {
            //     "Id": 15,
            //     "PartnerId": 2,
            //     "ReceiptStatus": 1,
            //     "ImportDate": "2024-10-09T00:00:00",
            //     "WareHouseId": 1,
            //     "ListGoodReciptDetailsModel": [
            //             {
            //                 "Id": 38,
            //                 "GoodReceiptId": 15,
            //                 "ProductId": 2,
            //                 "PriceUnit": 100,
            //                 "Quantity": 100
            //             },
            //             {
            //                 "Id": 39,
            //                 "GoodReceiptId": 15,
            //                 "ProductId": 3,
            //                 "PriceUnit": 100,
            //                 "Quantity": 300
            //             },
            //             {
            //                 "Id": 40,
            //                 "GoodReceiptId": 15,
            //                 "ProductId": 1005,
            //                 "PriceUnit": 100,
            //                 "Quantity": 300
            //             }
            //         ]
            //     }
            return _goodReciptService.UpdateGoodReceipt(id, goodsReceiptModel);
        }
    }
}
