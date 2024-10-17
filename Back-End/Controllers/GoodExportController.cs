﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpGet]
        [Route("getGoodExportById/{id}")]
        public GoodsExportModel GetGoodExportById(int id)
        {
            return _goodExportService.GetGoodExportById(id);
        }

        [HttpPost]
        [Route("addGoodExport")]
        public bool AddGoodExport([FromBody] paramAddNewGoodExport param)
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
            return _goodExportService.AddGoodExport(param.goodsExportModel, param.listGoodExportDetailModels, autoAccept: false);
        }

        [HttpGet]
        [Route("acceptGoodExport/{id}")]
        public GoodsExportModel AcceptGoodExport(int id)
        {

            return _goodExportService.AcceptGoodExport(id);
        }


        [HttpPut]
        [Route("updateGoodExport/{id}")]
        public GoodsExportModel EditGoodExport(int id, [FromBody] GoodsExportModel goodsExportModel)
        {
            //{
            //    "Id": 38,
            //    "CustomerId": 3,
            //    "Status": 1,
            //    "ExportDate": "2024-10-09T00:00:00",
            //    "WareHouseId": 5,
            //    "ListGoodExportDetailsModel": [
            //        {
            //                    "Id": 57,
            //            "GoodExportId": 38,
            //            "ProductId": 4,
            //            "Quantity": 3
            //        },
            //        {
            //                    "Id": 58,
            //            "GoodExportId": 38,
            //            "ProductId": 5,
            //            "Quantity": 3
            //        }
            //    ]
            //}
            return _goodExportService.UpdateGoodExport(id, goodsExportModel);
        }
    }
}
