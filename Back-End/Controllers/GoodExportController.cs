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

    public class paramAddNewGoodExport
    {
        public GoodsExportModel goodsExportModel { get; set; }
        public List<GoodExportDetailModel> listGoodExportDetailModels { get; set; }
        public int idWareHouse { get; set; }
    }

    [Route("[controller]")]
    [ApiController]
    public class GoodExportController
    {
        private IGoodExportService _goodExportService;

        public GoodExportController(IGoodExportService goodExportService)
        {
            _goodExportService = goodExportService;
        }

        [HttpGet]
        [Route("GetAllGoodExports")]
        public List<GoodsExportModel> GetAllGoodExports()
        {
            return _goodExportService.GetAllGoodExports();
        }

        [HttpPost]
        [Route("addGoodRecipt")]
        public bool AddGoodRecipt([FromBody] paramAddNewGoodExport param)
        {
            //Template
            /*
            {
                "goodsExportModel": {
                    "CustomerId": 2, 
                    "Status": 0,
                    "ListGoodExportDetailsModel":[]  //Can ignore
                },
                "listGoodExportDetailModels": [
                    {
                        "GoodExportId": 4, //Can ignore
                        "ProductId": 3,
                        "Quantity": 15
                    },
                    {
                        "GoodExportId": 4, //Can ignore
                        "ProductId": 2,
                        "Quantity": 16
                    }
                ],
                "idWareHouse": 1
            }
            */
            return _goodExportService.AddGoodExport(param.goodsExportModel, param.listGoodExportDetailModels, param.idWareHouse);
        }
    }
}
