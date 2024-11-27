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
        public List<BillMonthAnalyse> GetAllBillAnalyseMonth(DateParam dateParam);
        public List<PriceProductAnalyse> GetAllPriceOfProduct(int productId);
    }
    public class AnalyseService : IAnalyseService
    {
        private readonly IGoodReciptService _goodReciptService;
        private readonly IGoodExportService _goodExportService;
        private readonly IBillService _billService;
        private readonly IProductService _productService;
        private readonly IWareHouseService _wareHouseService;
        private readonly IPriceProductService _priceProductService;

        public AnalyseService(
            IGoodReciptService goodReciptService,
            IGoodExportService goodExportService,
            IBillService billService,
            IWareHouseService wareHouseService,
            IPriceProductService priceProductService,
            IProductService productService
            )
        {
            _goodReciptService = goodReciptService;
            _goodExportService = goodExportService;
            _productService = productService;
            _billService = billService;
            _priceProductService = priceProductService;
            _wareHouseService = wareHouseService;
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

        public List<BillMonthAnalyse> GetAllBillAnalyseMonth(DateParam dateParam)
        {
            if (dateParam.StartDate == null)
            {
                dateParam.StartDate = DateTime.MinValue;
            }
            if (dateParam.EndDate == null)
            {
                dateParam.EndDate = DateTime.MaxValue;
            }
            List<BillModel> allBill = _billService.GetAllByDate(dateParam);
            List<BillMonthAnalyse> result = allBill.GroupBy(b => new { b.CreatedDate.Month, b.CreatedDate.Year, b.WareHouseId })
                                .Select(group => new BillMonthAnalyse
                                {
                                    Month = group.Key.Month,
                                    Year = group.Key.Year,
                                    WareHouseId = group.Key.WareHouseId,
                                    WareHouseName = _wareHouseService.GetById(group.Key.WareHouseId).Address,
                                    TotalAmount = group.Sum(g => g.TotalAmount),
                                }).ToList();

            result = result.OrderBy(x => x.Year).ThenBy(x => x.Month).ToList();
            return result;
        }
    
        public List<PriceProductAnalyse> GetAllPriceOfProduct(int productId)
        {
            List<PriceProductModel> allById = _priceProductService.GetByProductId(productId);

            List<PriceProductAnalyse> result =  allById.GroupBy(b => new { b.StartDate.Day, b.StartDate.Month, b.StartDate.Year })
                                                        .Select(group => new PriceProductAnalyse
                                                        {
                                                            Day = group.Key.Day,
                                                            Month = group.Key.Month,
                                                            Year = group.Key.Year,
                                                            Price = group.OrderByDescending(x => x.StartDate).FirstOrDefault().Price,
                                                        }).ToList();

            result = result.OrderBy(r => r.Year).ThenBy(r =>r.Month).ThenBy(r => r.Day).ToList();
            return result;
        }
    }
}
