using Microsoft.AspNetCore.Mvc;
using System;
using APIBackEnd.Models;
using APIBackEnd.Repository;
using APIBackend.Repository;
using APIBackEnd.Data;
using APIBackend.Models;
using APIBackend.Service;


namespace APIBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GoodTransferController
    {
        private IGoodTransferService _goodTransferService;

        public GoodTransferController(IGoodTransferService goodTransferService)
        {
            _goodTransferService = goodTransferService;
        }

        [HttpGet]
        [Route("getAllGoodTransferByRole")]
        public List<GoodsTransferModel> GetAllGoodTransfersByRole()
        {
            return _goodTransferService.GetAllGoodTransfersByRole();
        }

        [HttpGet]
        [Route("getGoodTransferById/{id}")]
        public GoodsTransferModel GetGoodTransferById(int id)
        {
            return _goodTransferService.GetGoodTransferById(id);
        }

        [HttpPost]
        [Route("addGoodTransfer")]
        public bool AddGoodTransfer([FromBody] GoodsTransferModel goodsTransferModel)
        {
            // {
            // "Id": 0,
            // "CustomerId": 3,
            // "Status": 1,
            // "ExportDate": "2024-10-09T00:00:00",
            // "FromWareHouseId": 5,
            // "ToWareHouseId": 5,
            // "UserId": 1,
            // "ListGoodTransferDetailsModel": [
            //         {
            //             "ProductId": 4,
            //             "Quantity": 3
            //         },
            //         {
            //             "Id": 58,
            //             "ProductId": 5,
            //             "Quantity": 3
            //         }
            //     ]
            // }
            return _goodTransferService.AddGoodTransfer(goodsTransferModel, goodsTransferModel.ListGoodTransferDetailsModel, autoAccept: false);
        }

        [HttpGet]
        [Route("acceptGoodTransfer/{id}")]
        public GoodsTransferModel AcceptGoodTransfer(int id)
        {

            return _goodTransferService.AcceptGoodTransfer(id);
        }

        [HttpPost]
        [Route("updateGoodTransfer/{id}")]
        public GoodsTransferModel UpdateGoodTransfer(int id, [FromBody] GoodsTransferModel goodsTransferModel)
        {
            // {
            // "Id": 0,
            // "CustomerId": 3,
            // "Status": 1,
            // "ExportDate": "2024-10-09T00:00:00",
            // "FromWareHouseId": 5,
            // "ToWareHouseId": 5,
            // "UserId": 1,
            // "ListGoodTransferDetailsModel": [
            //         {
            //             "ProductId": 4,
            //             "Quantity": 3
            //         },
            //         {
            //             "Id": 58,
            //             "ProductId": 5,
            //             "Quantity": 3
            //         }
            //     ]
            // }
            return _goodTransferService.UpdateGoodTransfer(id, goodsTransferModel);
        }

        [HttpGet]
        [Route("cancelGoodTransfer/{id}")]
        public GoodsTransferModel CancelGoodTransfer(int id)
        {

            return _goodTransferService.CancelGoodTransfer(id);
        }
    }
}
