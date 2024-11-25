using APIBackend.DataModel.Analyse;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Models;
using System.Collections.Generic;

namespace APIBackend.Service
{
    public interface IAnalyseService
    {
        List<GoodNoteAnalyse> GetAllGoodReceiptByDate(DateParam dateParam);
        public List<GoodNoteAnalyse> GetAllGoodExporttByDate(DateParam dateParam);
    }
    public class AnalyseService : IAnalyseService
    {
        private readonly IGoodReciptService _goodReciptService;
        private readonly IGoodExportService _goodExportService;
        private readonly IProductService _productService;

        public AnalyseService(
            IGoodReciptService goodReciptService,
            IGoodExportService goodExportService,
            IProductService productService
            )
        {
            _goodReciptService = goodReciptService;
            _goodExportService = goodExportService;
            _productService = productService;
        }

        public List<GoodNoteAnalyse> GetAllGoodReceiptByDate(DateParam dateParam)
        {
            if(dateParam.StartDate == null)
            {
                dateParam.StartDate = DateTime.MinValue;
            }
            if (dateParam.EndDate == null)
            {
                dateParam.EndDate = DateTime.MaxValue;
            }
            List<GoodsReceiptModel> goodsReceipt = _goodReciptService.GetAllGoodReciptsByDate(dateParam);

            List<GoodReceiptDetailModel> allDetails = goodsReceipt.SelectMany(gr => gr.ListGoodReciptDetailsModel).ToList();

            List<GoodNoteAnalyse> result = allDetails.GroupBy(x => x.ProductId)
                                                    .Select(group => new GoodNoteAnalyse
                                                    {
                                                        ProductId = group.Key,
                                                        Quantity = group.Sum(x => x.Quantity),
                                                        ProductName = _productService.GetProductById(group.Key).Name,
                                                        Precentage = 0
                                                    }).ToList();
            int totalItem = result.Sum(r => r.Quantity);

            result = result.Select(x =>
            {
                x.Precentage = (x.Quantity / totalItem) * 100;
                return x;
            }).ToList();



            return result;
        }

        public List<GoodNoteAnalyse> GetAllGoodExporttByDate(DateParam dateParam)
        {
            if(dateParam.StartDate == null)
            {
                dateParam.StartDate = DateTime.MinValue;
            }
            if (dateParam.EndDate == null)
            {
                dateParam.EndDate = DateTime.MaxValue;
            }
            List<GoodsExportModel> goodsExport = _goodExportService.GetAllGoodExportByDate(dateParam);

            List<GoodExportDetailModel> allDetails = goodsExport.SelectMany(gr => gr.ListGoodExportDetailsModel).ToList();

            List<GoodNoteAnalyse> result = allDetails.GroupBy(x => x.ProductId)
                                                    .Select(group => new GoodNoteAnalyse
                                                    {
                                                        ProductId = group.Key,
                                                        Quantity = group.Sum(x => x.Quantity),
                                                        ProductName = _productService.GetProductById(group.Key).Name,
                                                        Precentage = 0
                                                    }).ToList();
            int totalItem = result.Sum(r => r.Quantity);

            result = result.Select(x =>
            {
                x.Precentage = (x.Quantity / totalItem) * 100;
                return x;
            }).ToList();
            return result;
        }
    
    }
}
