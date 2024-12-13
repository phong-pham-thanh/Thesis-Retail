using APIBackend.Models;
using APIBackEnd.Models;
using APIBackEnd.Data;
using APIBackend.Service;
using Microsoft.AspNetCore.Mvc;
using APIBackEnd.Controllers;
using APIBackend.DataModel.Analyse;


namespace APIBackend.Controllers
{

    [Route("[controller]")]
    public class AnalyseController
    {
        private readonly IAnalyseService _service;
        public AnalyseController(IAnalyseService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("goodReceipt")]
        public List<GoodNoteAnalyse> analyseGoodReceipt([FromBody] DateParam dateParam)
        {
            return _service.GetAllGoodReceiptByDate(dateParam);
        }

        [HttpPost]
        [Route("goodExport")]
        public List<GoodNoteAnalyse> analyseGoodExport([FromBody] DateParam dateParam)
        {
            return _service.GetAllGoodExporttByDate(dateParam);
        }


        [HttpPost]
        [Route("billByMonth")]
        public List<BillMonthAnalyse> analyseBillByMonth([FromBody] DateParam dateParam)
        {
            return _service.GetAllBillAnalyseMonth(dateParam);
        }


        [HttpGet]
        [Route("priceProdctAnalyse/{productId}")]
        public List<PriceProductAnalyse> analysePriceProduct(int productId)
        {
            return _service.GetAllPriceOfProduct(productId);
        }

        [HttpGet]
        [Route("priceProdctImportAnalyse/{productId}")]
        public List<PriceProductAnalyse> analysePriceProductImport(int productId)
        {
            return _service.GetAllPriceImportOfProduct(productId);
        }
    }
}
